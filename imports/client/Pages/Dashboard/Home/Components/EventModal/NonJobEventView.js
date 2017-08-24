import React, { Component } from 'react';

export default class NonJobEventView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.event.title,
            description: props.event.description,
            startAtString: props.event.startAt.toDateString(),
            endAtString: props.event.endAt.toDateString(),
            startAtTime: props.event.startAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            endAtTime: props.event.endAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        }
    }

    render() {
        return (
            <div className="container center-align" style={{height: 300}}>
                <h4 style={{paddingTop: 10}}>{this.state.title}</h4>
                <div className="left-align">
                    <div className="row">
                        <span className="toBold">Date: </span>
                        {this.state.startAtString} - {this.state.endAtString}
                    </div>
                    <div className="row">
                        <span className="toBold">Time: </span>
                        {this.state.startAtTime} - {this.state.endAtTime}
                    </div>
                    <div className="row">
                        <span className="toBold">Event Description: </span><br />
                        {this.state.description}
                    </div>
                </div>
                <button style={{paddingBottom: 10}} className="waves-effect waves-light btn">
                    Done!
                </button>
            </div>
        );
    }
}
