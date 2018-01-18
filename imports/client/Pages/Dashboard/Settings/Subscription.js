import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'

class Subscription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Dummy date value
            date: new Date(),
        };
    }

    // Returns a MM/DD/YYYY  string format for Date objects
    dateFormatter(date) {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }

    render() {
        if (this.props.loggingIn) {
            return (
                <div className="preloader-wrapper big active center-align">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            )

        } else {
            return (
                <div className="container center-align">
                    <div id="subscription" className="card white center-align">
                        <h5 style={{'marginBottom': 20}}>Subscription</h5>
                        <div className="left-align">
                            <strong>Member since:</strong> {this.dateFormatter(this.state.date)}
                            <br/>
                            {
                                  this.props.user?
                                    <span><strong>Next billing date:</strong> {this.dateFormatter(this.state.date)}</span>
                                    :
                                    <span style={{opacity: 0.5}}>Next billing date: -</span>

                            }
                        </div>
                        <div className="center-align" style={{'marginTop': 60}}>
                              {
                                //THE LINES BELOW MAKES NO SENSE
                                //SINCE ITS CHECKING IF THERE IS A LOGGED IN USER
                                //BUT TO ACCESS THIS PAGE YOU HAVE TO BE LOGGED IN
                                this.props.user ?
                                  <button className="btn waves-effect waves-light red lighten-1 lowercase">Cancel Membership</button>
                                  :
                                  <button className="btn waves-effect waves-light green lighten-1 lowercase">Resume Membership</button>
                              }

                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withTracker( params => {
    return {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
    }
}) (Subscription);
