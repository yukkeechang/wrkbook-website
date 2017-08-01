import React from 'react';

import GeneralInfo from './Components/GeneralInfo';

import About from './Components/About';
import Contact from './Components/Contact';
import Cert from './Components/Certifications';
import Payment from './Components/Payment';
import Reviews from './Components/Reviews';

export default class ContractorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutDisplayed: false,
      contactDisplayed: false,
      certDisplayed: false,
      paymentDisplayed: false,
      reviewsDisplayed: false,
      aboutButtonActive: true,
      contactButtonActive: false,
      certButtonActive: false,
      paymentButtonActive: false,
      reviewsButtonActive: false,
    };
  }

  onAboutClick = () => {
    this.setState({
      aboutDisplayed: true,
      contactDisplayed: false,
      certDisplayed: false,
      paymentDisplayed: false,
      reviewsDisplayed: false,
      aboutButtonActive: true,
      contactButtonActive: false,
      certButtonActive: false,
      paymentButtonActive: false,
      reviewsButtonActive: false,
    });
  }

  onContactClick = () => {
    this.setState({
      aboutDisplayed: false,
      contactDisplayed: true,
      certDisplayed: false,
      paymentDisplayed: false,
      reviewsDisplayed: false,
      aboutButtonActive: false,
      contactButtonActive: true,
      certButtonActive: false,
      paymentButtonActive: false,
      reviewsButtonActive: false,
    });
  }

  onCertClick = () => {
    this.setState({
      aboutDisplayed: false,
      contactDisplayed: false,
      certDisplayed: true,
      paymentDisplayed: false,
      reviewsDisplayed: false,
      aboutButtonActive: false,
      contactButtonActive: false,
      certButtonActive: true,
      paymentButtonActive: false,
      reviewsButtonActive: false,
    });
  }

  onPaymentClick = () => {
    this.setState({
      aboutDisplayed: false,
      contactDisplayed: false,
      certDisplayed: false,
      paymentDisplayed: true,
      reviewsDisplayed: false,
      aboutButtonActive: false,
      contactButtonActive: false,
      certButtonActive: false,
      paymentButtonActive: true,
      reviewsButtonActive: false,
    });
  }

  onReviewsClick = () => {
    this.setState({
      aboutDisplayed: false,
      contactDisplayed: false,
      certDisplayed: false,
      paymentDisplayed: false,
      reviewsDisplayed: true,
      aboutButtonActive: false,
      contactButtonActive: false,
      certButtonActive: false,
      paymentButtonActive: false,
      reviewsButtonActive: true,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s3">
            <GeneralInfo />
          </div>
          <div className="col s9">
            <div className="row">
              <a className="waves-effect waves-light btn-flat col s2 offset-s1"
                  style = { this.state.aboutButtonActive ?
                  { fontSize: 12, color: "teal" } :
                  { fontSize: 12, color: "black" }
                }
                onClick={this.onAboutClick}>About</a>
              <a className="waves-effect waves-teal btn-flat col s2"
              style = { this.state.contactButtonActive ?
                { fontSize: 12, color: "teal" } :
                { fontSize: 12, color: "black" }
              }
                onClick={this.onContactClick}>Contact</a>
              <a className="waves-effect waves-teal btn-flat col s2"
                style = { this.state.certButtonActive ?
                  { fontSize: 12, color: "teal" } :
                  { fontSize: 12, color: "black" }
                }
                onClick={this.onCertClick}>Certifications</a>
              <a className="waves-effect waves-teal btn-flat col s2"
                style = { this.state.paymentButtonActive ?
                  { fontSize: 12, color: "teal" } :
                  { fontSize: 12, color: "black" }
                }
                onClick={this.onPaymentClick}>Payment</a>
              <a className="waves-effect waves-teal btn-flat col s2"
                style = { this.state.reviewsButtonActive ?
                  { fontSize: 12, color: "teal" } :
                  { fontSize: 12, color: "black" }
                }
                onClick={this.onReviewsClick}>Reviews</a>
            </div>
            { this.state.aboutDisplayed && <About /> }
            { this.state.contactDisplayed && <Contact /> }
            { this.state.certDisplayed && <Cert /> }
            { this.state.paymentDisplayed && <Payment /> }
            { this.state.reviewsDisplayed && <Reviews /> }
          </div>
        </div>
      </div>
    )
  }
}
