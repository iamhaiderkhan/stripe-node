var stripe = require('stripe')("sk_test_cGn1kexqDuV85WmWyb9dRzal00TVWS8Ye6");
const { payment } = require('../../../lib/middlewares/validations');
const {generateToken} = require('../../../lib/middlewares/stripeToken')
module.exports = function (router) {
  router.post('/payment', payment, async (req, res) => {
   
    let userEmail = req.body.email;
    let card = req.body.card;
    let amount = req.body.amount;
    let token = await generateToken(card, res);
 
    //Create stripe customer
    let stripeCustomer = await stripe.customers.create({
      email: userEmail,
      source: token.id
    })

 
    //Create stripe payment

    let charge = await stripe.charges.create({
      amount: amount *100,
      currency: "usd",
      customer: stripeCustomer.id,
    })

    
    if (charge) {
      res.status(200).json({
        stripe: {
          customer: stripeCustomer,
          payment: charge
        },
        message: `You successfully paid ${amount}$.`
      })
    }


  })
}
