import React from "react";
import MTextField from "../../../../../Shared/MTextField";
import { Meteor } from "meteor/meteor";
import Moment from "moment";
import { Roles } from "meteor/alanning:roles";
import ReactDOM from "react-dom";

export default class ChannelCard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(() => {
      $(".modal").modal();
    });
  }
  openModal = () => {
    $(this.refs.channelModal).modal("open");
  };
  doNothing = () => {
    $(this.refs.channelModal).modal("close");
  };
  handleChannel = () => {
    let channel = {
      name: this.refs.newChannel.value(),
      jobId: this.props.jobId
    };
    Meteor.call("createChannel", channel, err => {
      if (err) {
        console.log(err);
      } else {
        $(this.refs.channelModal).modal("close");
      }
    });
  };
  render() {
    return (
      <div>
        <div
          onClick={this.openModal}
          style={{ cursor: "pointer" }}
          className="row "
        >
          <div className="col center-align s12">
            <h5 className="card-title teal-text">
              <span>
                {" "}
                <i className="material-icons">control_point</i>{" "}
              </span>Channel
            </h5>
          </div>
        </div>

        <div ref="channelModal" className="modal">
          <div className="modal-content">
            <div className="row center-align">
              <h3>Add A New Channel?</h3>
              <div className="input-field col s12">
                <MTextField
                  ref="newChannel"
                  id="channelName"
                  error={""}
                  label="Channel Name *"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <div className="col s6">
              <button
                style={{ width: "100%" }}
                className="waves-effect blue-grey lighten-5 btn-flat"
                onClick={this.doNothing}
              >
                Cancel
              </button>
            </div>
            <div className="col s6">
              <button
                style={{ width: "100%" }}
                className="waves-effect waves-red red lighten-3 btn-flat"
                onClick={this.handleChannel}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
