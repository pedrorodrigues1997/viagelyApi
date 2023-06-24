import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/ad.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";
import { Buffer } from 'buffer';


import crypto from 'crypto';







export  const paymentSuccessFromWebhook = async (request, response, next) =>{
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = 'whsec_exezuvZDN6ButRTyadMfYC663HUcxEk7';

  const sig = request.headers['stripe-signature'];
  let event;
  console.log("Before");
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log(event);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
    // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      handlePaymentIntentSucceeded(JSON.parse(request.body));
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return response.json({ received: true });
}


//How can we garantee that only Stripe will send this webhook? Won't someone on postman replicate this and make me add monye to
//their wallet?

const handlePaymentIntentSucceeded = async (receivedHookEvent) => {
  console.log(receivedHookEvent);
  console.log(receivedHookEvent.data.object.id);
//IF event id já aconteceu nao posso deixar voltar. Criar Tabela com EventID e Order ID



        try{
            const orders = await Order.findOneAndUpdate(
                {
                  payment_intent: receivedHookEvent.data.object.id,
                },
                {
                  $set: {
                    isCompleted: true,
                  },
                }
              );
              console.log(orders);


              if(!orders) return createError(404, "Order not found for that payment");

              //Order was found

              //Get Seller and add 80% of amount to account
              //Buyer will not be deducted here because it used stripe. He never used wallet money in this case
              const seller = await User.findOneAndUpdate({
                _id: orders.sellerId,
              },
              {
                $inc:{
                    balance: calculateAmountForSeller(orders.price),
                 }
              });


              if(!seller) return createError(404, "Seller not found for that Order");


              //Add paymentConfirmed adId to buyer
              const buyer = await User.findOneAndUpdate({
                _id: orders.buyerId,
              },
              {
                $push:{
                  purchasedOrders: orders.adId,
                 }
              });

              if(!buyer) return createError(404, "Buyer not found for that Order");
              //Send email to seller

              //Send email to buyer with the PDF file
              
           
     }catch(err){
         console.log(err);
     }


}



const calculateAmountForSeller = (amount) =>{

    const calculatedAmount =  (amount * 0.8);
    console.log("Seller got another " + calculatedAmount);
    return calculatedAmount;
}
