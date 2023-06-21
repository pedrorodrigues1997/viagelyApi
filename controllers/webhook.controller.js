import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/ad.model.js";
import User from "../models/user.model.js";


export  const paymentSuccessFromWebhook = async (req, res, next) =>{
    const event = req.body;
    console.log(event);
    console.log("Im in Webhook response!");
 // Handle the event
 switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({received: true});
    

 

};


//How can we garantee that only Stripe will send this webhook? Won't someone on postman replicate this and make me add monye to
//their wallet?

const handlePaymentIntentSucceeded = async (receivedHookEvent) => {

        try{
            const orders = await Order.findOneAndUpdate(
                {
                  payment_intent: receivedHookEvent.id,
                },
                {
                  $set: {
                    isCompleted: true,
                  },
                }
              );

              if(!orders) return createError(404, "Order not found for that payment");

              //Order was found

              //Get Seller and add 80% of amount to account
              //Buyer will not be deducted here because it used stripe. He never used wallet money in this case
              const seller = await User.findOneAndUpdate({
                _id: orders.sellerId,
              },
              {
                $inc:{
                    balance: calculateAmountForSeller(receivedHookEvent.amount),
                 }
              });

              if(!seller) return createError(404, "Seller not found for that Order");

       
           
     }catch(err){
         console.log(err);
     }


}



const calculateAmountForSeller = (amount) =>{

    const calculatedAmount =  (amount * 0.8) / 100;
    console.log("Seller got another " + calculatedAmount);
    return calculatedAmount;
}
