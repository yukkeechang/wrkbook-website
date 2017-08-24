import React, { Component } from 'react';
import NonJobEventCreate from './NonJobEventCreate';
import NonJobEventView from './NonJobEventView';

export default class NonJobEventModal extends Component {
    constructor(props) {
        super(props);

        this.event = {
            title: 'This is the title',
            description: 'This is the description',
            startAt: new Date(),
            endAt: new Date(),
        }
    }

    componentDidMount() {
        $('.modal').modal();
    }

    render() {
        return (
            <div>
                <div>
                    <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Create Event</a>
                    <div id="modal1" className="modal" >
                        <NonJobEventCreate/>
                    </div>
                </div>
                <div>
                    <a className="waves-effect waves-light btn modal-trigger" href="#modal2">View Event</a>
                    <div id="modal2" className="modal">
                        <NonJobEventView
                             event={this.event}/>
                    </div>
                </div>
            </div>
        );
    }
}
