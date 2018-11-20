import React, { Component } from 'react'
import BraintreeHostedFields from './BraintreeHostedFields'
import BraintreeDropIn from './BraintreeDropIn'

const BraintreeWebDropIn = (props) => {
  const { isHostedFields } = props

  if (isHostedFields) {
    return <BraintreeHostedFields {...props}/>
  } else {
    return <BraintreeDropIn {...props}/>
  }
}

export default BraintreeWebDropIn
