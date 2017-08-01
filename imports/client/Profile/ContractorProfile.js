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
    };
  }

  onAboutClick = () => {
    this.setState({
      aboutDisplayed: true,
      contactDisplayed: false,
      certDisplayed: false,
      paymentDisplayed: false,
      reviewsDisplayed: false,
    });
  }

  onContactClick = () => {
    this.setState({
      aboutDisplayed: false,
      contactDisplayed: true,
      certDisplayed: false,
      paymentDisplayed: false,
      reviewsDisplayed: false,
    });
  }

  onCertClick = () => {
    this.setState({
      aboutDisplayed: false,
      contactDisplayed: false,
      certDisplayed: true,
      paymentDisplayed: false,
      reviewsDisplayed: false,
    });
  }

  onPaymentClick = () => {
    this.setState({
      aboutDisplayed: false,
      contactDisplayed: false,
      certDisplayed: false,
      paymentDisplayed: true,
      reviewsDisplayed: false,
    });
  }

  onReviewsClick = () => {
    this.setState({
      aboutDisplayed: false,
      contactDisplayed: false,
      certDisplayed: false,
      paymentDisplayed: false,
      reviewsDisplayed: true,
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
              <a className="waves-effect waves-light btn col s2 offset-s1"
                style={{fontSize: 12}}
                onClick={this.onAboutClick}>About</a>
              <a className="waves-effect waves-light btn col s2"
                style={{fontSize: 12}}
                onClick={this.onContactClick}>Contact</a>
              <a className="waves-effect waves-light btn col s2"
                style={{fontSize: 12}}
                onClick={this.onCertClick}>Certifications</a>
              <a className="waves-effect waves-light btn col s2"
                style={{fontSize: 12}}
                onClick={this.onPaymentClick}>Payment</a>
              <a className="waves-effect waves-light btn col s2"
                style={{fontSize: 12}}
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
