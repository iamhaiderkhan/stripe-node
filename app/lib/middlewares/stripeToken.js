
var stripe = require('stripe')("sk_test_cGn1kexqDuV85WmWyb9dRzal00TVWS8Ye6")
module.exports = {
  generateToken: async(card, res) => {
    let cardToken = await stripe.tokens.create({card:card });
    if (cardToken) {
      console.log(cardToken,"=>")
      return cardToken
    }
  }
}