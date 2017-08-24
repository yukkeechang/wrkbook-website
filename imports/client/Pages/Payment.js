import React, { Component } from 'react';

export default class Payment extends Component {
    constructor(props) {
        super(props);

        // Jon's Stripe API Key and access to Elements UI
        const stripe = Stripe(Meteor.settings.public.stripe);
        const elements = stripe.elements();

        const style = {
            base: {
            fontSize: '16px',
            lineHeight: '24px'
            }
        };

        // Create an instance of the card Element. One input form that captures
        // Card Number, Exp. Date, CVC, and Zip Code (can be split up if needed)
        const card = elements.create('card', {style: style});

        this.state = {
            stripe,
            card,
        };
    }

    componentDidMount() {
        // Add an instance of the card Element into the `card-element` <div>
        this.state.card.mount('#card-element');
    }

    handleSubmit(event) {
        event.preventDefault();

        // Create a token using the payment info inputted into the form
        this.state.stripe.createToken(this.state.card).then(result =>{
            // Display an error if a valid token can't be created
            if (result.error) {
                $('#card-errors').html(result.error.message);
            } else {
                this.stripeTokenHandler(result.token);
            }
        });
    }

    stripeTokenHandler(token) {
        // Insert the token ID into the form so it gets submitted to the server
        $('<input>', {
            'type': 'hidden',
            'name': 'stripeToken',
            'value': token.id
        }).appendTo('#payment-form');

        // Replace this with whatever meteor wants to do with the form submission
        // $('#payment-form').submit();
        // console.log(token.id);
        Meteor.call('getStoredPayments',(err,result)=>{
          if (err) {
            console.log(err);
          }
          console.log(result);

        });
    }

    render() {
        return (
            <div className="container center-align">
                <h5 style={{'marginBottom': 20}}>Payment</h5>
                <div id="payment" className="card white">
                    <form id="payment-form" onSubmit={this.handleSubmit.bind(this)} method="post">
                        <div className="row">
                            <div id="card-errors" role="alert" className="col s12" />
                            <div className="col s12">
                                <label htmlFor="card-element">Credit or debit card:</label>
                                <div id="card-element" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button className="btn waves-effect waves-light blue lighten-1">Payment total: $200</button>
                            </div>
                            <div className="input-field col s12">
                                <button type="submit" className="btn waves-effect waves-light teal">Pay</button>
                            </div>
                        </div>
                    </form>
                </div>

                <p id="agreement">
                    By subscribing, you are agreeing to pay $100 a month for WrkBook’s services. You may cancel your subscription at any time. You are responsible for the full subscription fee in the monthly billing cycle in which you cancel. Once your account has been billed, all sales are final and there will be no refunds.
                </p>
            </div>
        );
    }
}
