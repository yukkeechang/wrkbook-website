import React, { Component } from "react";
import MTextField from "../../Shared/MTextField";
import Button from "../../Shared/Button";

export default class CollectEmails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pro: true,
      buttonColor: "grey darken-3",
      buttonText: "Submit",
      isEmail: true,
      nameEmpty: false,
      emailEmpty: false
    };
  }

  createLead(e) {
    e.preventDefault();
    let lead = {
      name: this.refs.name.value(),
      email: this.refs.email.value(),
      isPro: this.state.pro
    };

    Meteor.call("createLead", lead, err => {
      if (err) {
        this.setState(err.reason);
      } else {
        this.setState({ buttonColor: "green darken-4 ", buttonText: "Submitted" });
        Materialize.toast('Email and name has been submitted', 3000, 'rounded');
        this.refs.name.reset();
        this.refs.email.reset();
      }
    });
  }
  pro=()=>{
    $('#pro').prop('checked',true);
    $('#con').prop('checked',false);
    this.setState({ pro: true });
  }

  con=()=> {
    $('#con').prop('checked',true);
    $('#pro').prop('checked',false);
    this.setState({ pro: false });
  }

  render() {
    let empty = "This cannot be empty";
    let validState = this.state.isEmail ? "" : "This email must be valid";
    return (
      <div style={{ backgroundColor: "white" }}>
        <h4 className="center-align montserrat-reg container how-to-heading ">
          Made for construction professionals and contractors
        </h4>
        <div
          className="center-align container montserrat-med-i"
          style={{ fontSize: "25px", color: "#9B9B9B" }}
        >
          Sign up today for to get notified when our beta 2.0 comes out!{" "}
        </div>
        <div className="row container">
          <div className="col s12 m4 l4">
            <MTextField
              label="Name"
              ref="name"
              id="name"
              error={this.state.nameEmpty ? empty : ""}
            />
          </div>
          <div className="col s12 m4 l4">
            <MTextField
              label="Email"
              ref="email"
              id="email"
              error={this.state.emailEmpty ? empty : validState}
            />
          </div>
          <div className="col m4 l4">
            <div className="section" />
            <div>
              <input
                type="radio"
                id="pro"
                ref="pro"
                onClick={this.pro}
                defaultChecked={(this.state.pro)? "checked" :''}
              />
              <label htmlFor="pro">Professional/Skilled trade worker</label>
            </div>
            <div>
              <input
                type="radio"
                id="con"
                ref="con"
                onClick={this.con}
                defaultChecked={(this.state.pro)? '' :"checked"}
              />
              <label htmlFor="con">Contractor</label>
            </div>
          </div>
        </div>
        <div style={{paddingBottom:'15px',marginBottom:'0px'}} className="row">
          <Button
            className={`button-sh col s12 m4 l4 offset-l4 offset-m4 ${
              this.state.buttonColor
            }`}
            paddingTop="5px"
            onClick={e => this.createLead(e)}
            text={"white"}
            to=""
          >
            {this.state.buttonText}
          </Button>
        </div>
      </div>
    );
  }
}
