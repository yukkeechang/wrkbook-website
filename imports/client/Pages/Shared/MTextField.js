import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class MTextField extends Component {
  constructor(props) {
    super(props);
    let type = props.type ? props.type : "text";
    this.state = {
      type: type,
      error: props.error,
      active: true
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ error: nextProps.error });
  }
  value() {
    return this.refs.tf.value;
  }
  reset() {
    this.refs.tf.value = "";
  }
  render() {
    return (
      <div style={this.props.style} className="input-field">
        <input
          ref="tf"
          className={this.state.error ? "invalid" : ""}
          id={this.props.id}
          defaultValue={this.props.value}
          type={this.state.type}
        />
        <label ref="tl"  htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <span className="helper-text" data-error={this.state.error}></span>
      </div>
    );
  }
}
