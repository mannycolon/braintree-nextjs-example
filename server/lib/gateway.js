require('dotenv').config()
import braintree from 'braintree'

const environment = process.env.BRAINTREE_ENVIRONMENT

const gateway = braintree.connect({
  environment: braintree.Environment[environment],
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
})

export default gateway;
