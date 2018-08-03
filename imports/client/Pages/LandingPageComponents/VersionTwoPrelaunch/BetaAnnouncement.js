import React, { Component } from "react";

export default class Banner extends React.Component {
  handleClick = () => {
    this.props.handleClick("collectEmails");
  };

  render() {
    return (
      <div
        className="center-align montserrat-med teal"
        style={{
          fontSize: "25px",
          padding: "10px",
          color: "white"
        }}
      >
        <span> Our Beta Version 2.0 is coming out August 2018.</span>
        <button
          className="teal"
          style={{ border: "None"}}
          onClick={this.handleClick}
        >
          <span
            style={{
              borderBottom: "2px",
              paddingBottom: "1px",
              borderBottomStyle: "solid"
            }}
          >
            Sign Up
          </span>
        </button>
        <span>to find out more</span>
      </div>
    );
  }
}
