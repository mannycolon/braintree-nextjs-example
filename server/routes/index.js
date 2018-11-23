import { Router } from 'express'
import gateway from '../lib/gateway'


const routes = new Router()

routes.get('/braintree', (req, res) => {
  res.send('Braintree route is healthy')
})

routes.get('/braintree/v1/getToken', async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err)
        res.status(500).send(err)
      else
        res.send(response)
    })
  } catch (error) {
    res.status(500).send(err)
  }
})

routes.post('/braintree/v1/sandbox', async (req, res) => {
  try {
    // using the braintree nonce
    const clientNonce = req.body.paymentMethodNonce
    console.log(clientNonce)
    // create transaction for $15
    gateway.transaction.sale({
      amount: '15.00',
      paymentMethodNonce: clientNonce,
      options: {
        // This option requests the funds once it has been authorized successfully
        submitForSettlement: true
      }
    }, (error, result) => {
      if (result.success || result.transaction)
        res.send(result)
      else
        res.status(500).send(error)
    })
  } catch (error) {
    console.error(err)
    res.send(err)
  }
})

export default routes
