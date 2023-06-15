import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/ad.model.js";
import Stripe from "stripe";





/*export  const createOrder = async (req, res, next) =>{
    try{
            const gig = await Gig.findById(req.params.gigId);  //Vir no PARAMS O id é porque está no URL
                        //SE NAO TIVER AWAIT E COMO SE NUNCA CHAGASSE LOGO DA ERROS TIPO NAO ENCONTRAR OS DADOS NO POSTMAN

            const newOrder = new Order({
                adId: gig._id,
                image: gig.cover,
                title: gig.title,
                buyerId: req.userId,
                sellerId: gig.userId,
                price: gig.price,
                payment_intent: "temproorary"


            });


            await newOrder.save();
            res.status(200).send("Success Purchase");


    }catch(err){
        next(err);
    }
   
};*/


export  const getOrders = async (req, res, next) =>{
    try{
           const orders = await Order.find({
            ...({ buyerId: req.userId }),
            isCompleted: true,
          });
      
          res.status(200).send(orders);
    }catch(err){
        next(err);
    }
   
};


export const intent = async (req, res, next) => {
    const stripe = new Stripe("sk_test_51NIXdEFdEw69adsIg7rtK9zfGHrwJQ1mZ2uthnlkUzaqJjLOtfHqjM9mbbf99gaMgV5O0WRo4JJHirB6XKabH6Nq00GzsrB36z");
  
    const gig = await Gig.findById(req.params.id);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    const newOrder = new Order({
        adId: gig._id,
        image: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });
  
    await newOrder.save();
  
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  };






  export const confirm = async (req, res, next) => {
    try {
      const orders = await Order.findOneAndUpdate(
        {
          payment_intent: req.body.payment_intent,
        },
        {
          $set: {
            isCompleted: true,
          },
        }
      );
  
      res.status(200).send("Order has been confirmed.");
    } catch (err) {
      next(err);
    }
  };
  