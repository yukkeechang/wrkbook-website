import React from 'react';

import GeneralInfo from './ContractorProfile/GeneralInfo';
import About from './ContractorProfile/About';
import Contact from './ContractorProfile/Contact';
import Reviews from './ContractorProfile/Reviews';

export default class ContractorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutDisplayed: true,
      contactDisplayed: false,
      reviewsDisplayed: false,
      aboutButtonActive: true,
      contactButtonActive: false,
      reviewsButtonActive: false,
    };
  }

  // Deactivate all buttons and tab contents except for the one clicked
  onAboutClick = () => {
    this.setState({
      aboutDisplayed: true,
      contactDisplayed: false,
      reviewsDisplayed: false,
      aboutButtonActive: true,
      contactButtonActive: false,
      reviewsButtonActive: false,
    });
  }

  onContactClick = () => {
    this.setState({
      aboutDisplayed: false,
      contactDisplayed: true,
      reviewsDisplayed: false,
      aboutButtonActive: false,
      contactButtonActive: true,
      reviewsButtonActive: false,
    });
  }

  onCertClick = () => {
    this.setState({
      aboutDisplayed: false,
      contactDisplayed: false,
      reviewsDisplayed: false,
      aboutButtonActive: false,
      contactButtonActive: false,
      reviewsButtonActive: false,
    });
  }

  onPaymentClick = () => {
    this.setState({
      aboutDisplayed: false,
      contactDisplayed: false,
      reviewsDisplayed: false,
      aboutButtonActive: false,
      contactButtonActive: false,
      reviewsButtonActive: false,
    });
  }

  onReviewsClick = () => {
    this.setState({
      aboutDisplayed: false,
      contactDisplayed: false,
      reviewsDisplayed: true,
      aboutButtonActive: false,
      contactButtonActive: false,
      reviewsButtonActive: true,
    });
  }

  render() {
    return (
      <div className="container">
        <div
          className="row"
          style={{ height: 30, backgroundColor: '#10A96D', marginBottom: 0 }}
        >
        </div>
        <div
          className="row"
          style={{ height: 170, backgroundColor: '#F0F0F0', marginBottom: 0 }}
        >
          <img
            className=""
            style={{ height: "100%", marginTop: 20, marginLeft: 30 }}
            src="http://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" />
          <a className="waves-effect waves-teal btn-flat right">
            <i
              className="material-icons left"
              style={{ color: "gray" }}>
                settings
              </i>
              Edit Profile
          </a>
        </div>
        <div
          className="row"
          style={{ backgroundColor: '#F0F0F0' }}
        >
            <div
              className="col s3">
            </div>
            <div
              className="col s9"
              style={{ verticalAlign: "bottom" }}
            >
            <a
              className="waves-effect waves-light btn col s2 offset-s1"
              // Change button text color if it is active
              style = { this.state.aboutButtonActive ?
                { fontSize: 12, color: "#10A96D", backgroundColor: 'white' } :
                { fontSize: 12, color: "black", backgroundColor: 'white' }
              }
              onClick={this.onAboutClick}>
              About
            </a>
            <a
              className="waves-effect waves-light btn col s2"
              style = { this.state.contactButtonActive ?
                { fontSize: 12, color: "#10A96D", backgroundColor: 'white' } :
                { fontSize: 12, color: "black", backgroundColor: 'white' }
              }
              onClick={this.onContactClick}>
              Contact
            </a>
            <a
              className="waves-effect waves-light btn col s2"
              style = { this.state.reviewsButtonActive ?
                { fontSize: 12, color: "#10A96D", backgroundColor: 'white' } :
                { fontSize: 12, color: "black", backgroundColor: 'white' }
              }
              onClick={this.onReviewsClick}>
              Reviews
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col s3">
            <GeneralInfo onReviewsClick={this.onReviewsClick}/>
          </div>
          <div className="col s9">
            {/* Show tab content only if corresponding state is set to true */}
            { this.state.aboutDisplayed && <About /> }
            { this.state.contactDisplayed && <Contact /> }
            { this.state.reviewsDisplayed && <Reviews /> }
          </div>
        </div>
      </div>
    )
  }
}
