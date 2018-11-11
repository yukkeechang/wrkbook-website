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
        <span> *Snippet of Infomation.*</span>
        <button
          className="teal"
          style={{ border: "None"}}
          onClick={this.handleClick}
        >
          <span
            className="teal white-text  montserrat-med"
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
