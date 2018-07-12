import React from 'react';
import ChannelPanel from './Components/ChannelPanel';
import PersonPanel from './Components/PersonPanel';
import { Meteor } from 'meteor/meteor';
import Moment from 'moment';
import {Roles} from 'meteor/alanning:roles';

export default class SidePanel extends React.Component {
  constructor(props) {
    super(props);


  }
  componentWillMount(){

  }
  componentDidMount(){
    // console.log(this.props);

  }
  componentWillMount(){

  }
  handleParentClickBack=(e)=>{
    this.props.handleGreatGParentClick(e);
  }
  handleParentClickBackPerson=(e)=>{
    this.props.handleGreatGPClickPerson(e);
  }
  render(){

      return(

          <div>
              <ChannelPanel
                handleGrandParentClick={this.handleParentClickBack}
                jobId={this.props.job._id}/>
              <div className="row"></div>
              <PersonPanel
                handleGrandParentClickPerson={this.handleParentClickBackPerson}
                job={this.props.job}/>
          </div>

      )
  }

}
