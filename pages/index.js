import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import DropIn from '../components/BraintreeWebDropIn'

import './BraintreeWebDropIn.styles.css'

class Index extends Component {
  state = {
    clientToken: null
  }

  instance

  async componentDidMount() {
    try {
      // Get a client token for authorization from your server
      const response = await axios.get('http://localhost:8000/api/braintree/v1/getToken')
      const clientToken = response.data.clientToken

      this.setState({ clientToken })
    } catch (err) {
      console.error(err)
    }
  }

  async buy() {
    try {
      // Send the nonce to your server
      const { nonce } = await this.instance.tokenize()
      const response = await axios.post(
        'http://localhost:8000/api/braintree/v1/sandbox',
        { paymentMethodNonce: nonce }
      )

      console.log(response)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    if (!this.state.clientToken) {
      return (
        <div className="loading-container">
          <h1>Loading...</h1>
        </div>
      )
    } else {
      return (
        <div className="container ">
          <DropIn
            className="drop-in-container"
            options={{
              authorization: this.state.clientToken
            }}
            onInstance={(instance) => (this.instance = instance)}
          >
            <form id="cardForm">
              <label className="hosted-fields--label">Card Number</label>
              <div id="card-number" className="hosted-field"></div>

              <label className="hosted-fields--label">Expiration Date</label>
              <div id="expiration-date" className="hosted-field"></div>

              <label className="hosted-fields--label">CVV</label>
              <div id="cvv" className="hosted-field"></div>

              <label className="hosted-fields--label">Postal Code</label>
              <div id="postal-code" className="hosted-field"></div>
            </form>
          </DropIn>
          <button className="submit" onClick={this.buy.bind(this)}>Submit</button>
        </div>
      )
    }
  }
}

Index.propTypes = {
  title: PropTypes.string
}

export default Index
