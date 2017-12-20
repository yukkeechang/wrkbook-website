import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import {PROFESSIONAL} from '../../../../../api/Schemas/employeeSchema';
import {CONTRACTOR} from '../../../../../api/Schemas/employerSchema';
import GeneralInfo from './Components/GeneralInfo';
import About from './Components/About';
import Contact from './Components/Contact';
import Cert from './Components/Certifications';
import Payment from './Components/Payment';
import Reviews from './Components/Reviews';
import { createContainer } from 'meteor/react-meteor-data';
import {Link} from 'react-router-dom';
import RefCard from '../../../Dashboard/References/RefCard';

//import Header from '../Shared/Header';

export class ProProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      navBarTextSize: 12,
      mainProfileSize: "100%",
      mainProfileCentered: false,

    }
    const {user} = this.props
    console.log(user)
    this.state = {user: user}
    if (user.roles[0] === "PRO") {
      this.state = {isPro: true}
    } else if (user.roles[0] === "CON"){
      this.state = {isPro: false}
    }
  }

  componentDidMount() {
    // Update nav bar text size on page load
    this.updateNavBarText();
    // Add listener to change nav bar text size when screen size changes
    window.addEventListener("resize", this.updateNavBarText);

    // Add listener to change main profile image size and location on page load
    this.updateMainProfileSize();
    // Add listener to change main profile image size and location when screen size changes
    window.addEventListener("resize", this.updateMainProfileSize);

  }

  // Change nav bar font size depending on screen width
  //nav bar refers to the boxes ontop of the profile for about, contact, reviews, etc.
  updateNavBarText = () => {
    // Screen width
    let width = document.body.scrollWidth;

    if (width >= 600) {
      this.setState({
        navBarTextSize: 12,
      });
    } else if (width >= 375){
      this.setState({
        navBarTextSize: 10,
      });
    } else {
      this.setState({
        navBarTextSize: 10,
      });
    }

  }

  // Change main profile image size and location depending on screen width
  updateMainProfileSize = () => {
    // Screen width
    let width = document.body.scrollWidth;

    if (width >= 992) {
      this.setState({
        mainProfileSize: "30%",
        mainProfileCentered: false,
      });
    } else if (width >= 600) {
      this.setState({
        mainProfileSize: "40%",
        mainProfileCentered: false,
      });
    } else if (width >= 375){
      this.setState({
        mainProfileSize: "40%",
        mainProfileCentered: true,
      });
    } else {
      this.setState({
        mainProfileSize: "40%",
        mainProfileCentered: true,
      });
    }
  }

  // Deactivate all buttons and tab contents except for the one clicked
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
    let image;
    return (
      <div className="container">
        <div
          className="row gray-div"
        >
        <Link to={"/edit"} className="btn teal">
          <div className="col s12 m12 l12">
              <i className="material-icons left edit-profile-button">
                  settings
                </i>
                Edit Profile
          </div>
          </Link>
          <div
            className={ "col s12 m12 l12 " + (this.state.mainProfileCentered ? "center-align" : "") }
            style={{ marginBottom: 40, paddingRight: 40 }}>
            <img
              className="profile-img"
              style={{ width: this.state.mainProfileSize, height: "auto" }}
              src={"images/hardhat.png"}
            />
          </div>
        </div>
        <div className="row nav-bar-div">
            <div className="col s0 m0 l3">
            </div>
            <div className="col s12 m12 l9">
            <a
              className={ "btn-flat center-align col " + (this.state.isPro ? "s3" : "s4") + " l2" }
              // Change button text color if it is active
              style = { this.state.aboutButtonActive ?
                { borderLeft: "solid #F0F0F0 5px", boxShadow: "none", padding: 0, fontSize: this.state.navBarTextSize, textTransform: "none", color: "#10A96D", backgroundColor: 'white' } :
                { borderBottom: "solid #F0F0F0 5px", borderLeft: "solid #F0F0F0 5px", boxShadow: "none", padding: 0, fontSize: this.state.navBarTextSize, textTransform: "none", color: "black", backgroundColor: 'white' }
              }
              onClick={this.onAboutClick}>
              About
            </a>
            <a
              className={ "btn-flat center-align col " + (this.state.isPro ? "s3" : "s4") + " l2" }
              style = { this.state.contactButtonActive ?
                { borderLeft: "solid #F0F0F0 5px", boxShadow: "none", padding: 0, fontSize: this.state.navBarTextSize, textTransform: "none", color: "#10A96D", backgroundColor: 'white' } :
                { borderBottom: "solid #F0F0F0 5px", borderLeft: "solid #F0F0F0 5px", boxShadow: "none", padding: 0, fontSize: this.state.navBarTextSize, textTransform: "none", color: "black", backgroundColor: 'white' }
              }
              onClick={this.onContactClick}>
              Contact
            </a>
            {
              this.state.isPro ?
              <a
                className={ "btn-flat center-align col " + (this.state.isPro ? "s3" : "s4") + " l2" }
                style = { this.state.certButtonActive ? styles.certOne :  styles.certTwo}
                onClick={this.onCertClick}
                >
                Certifications
              </a> : null
            }
            <a
              className={" btn-flat center-align col " + (this.state.isPro ? "s3" : "s4") + " l2" }
              style = { this.state.reviewsButtonActive ? styles.certOne : styles.certTwo }
              onClick={this.onReviewsClick}>
              Reviews
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m12 l3">
            <GeneralInfo onReviewsClick={this.onReviewsClick} user={this.props.user} isPro={this.state.isPro} />
          </div>
          <div className="col s12 m12 l9">
            {/* Show tab content only if corresponding state is set to true */}
            { this.state.aboutDisplayed && <About user={this.props.user} isPro={ this.state.isPro }   /> }
            { this.state.contactDisplayed && <Contact isPro={ this.state.isPro } user={this.props.user} /> }
            {
              this.state.isPro
              ?
              this.state.certDisplayed && <Cert user={this.props.user} />
              :
              null
            }
            {this.state.reviewsDisplayed &&  <RefCard/> }
          </div>
          <div className="col s12 m12 l9">
            { this.state.reviewsDisplayed && <Reviews data={this.state.data} user={this.props.user}/> }
          </div>
        </div>
      </div>
    )
  }
}

export default ProProfile = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, ProProfilePage);


let styles = {
  certTwo: {
     borderBottom: "solid #F0F0F0 5px",
     borderLeft: "solid #F0F0F0 5px",
     boxShadow: "none",
     padding: 0,
     fontSize: 12,
     textTransform: "none",
     color: "black",
     backgroundColor: 'white'
  },
  certOne: {
       borderLeft: "solid #F0F0F0 5px",
       boxShadow: "none", padding: 0,
       fontSize: 12, textTransform: "none",
       color: "#10A96D",
       backgroundColor: 'white'
  }
}
