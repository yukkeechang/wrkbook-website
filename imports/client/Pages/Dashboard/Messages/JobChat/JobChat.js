import React from 'react';
import { Meteor } from 'meteor/meteor';
import Moment from 'moment';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
import {Roles} from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../../Shared/MSpinner';


class JobChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      whichChannel: '',
      whichPerson: '',
      messageName:''
    }

  }
  componentWillMount(){
    this.props.handle.stop();
  }
  componentDidMount(){
    // let employer = this.props.job.employerId;
    // console.log(employer);

    Meteor.call('findUserbyId',Meteor.userId(),(err,res)=>{
      if(err)console.log(err);
      if(res){
        this.setState({messageName:res.profile.firstName,
        whichPerson:Meteor.userId(),whichChannel:''});
      }
    });
  }
  handleWhichChannel=(e)=>{
    this.setState({whichChannel:e,
                  whichPerson:'' });
    Meteor.call('getChannel',e,(err,res)=>{
      if(err)console.log(err);
      if(res){
        this.setState({messageName:res.name});
      }
    });
  }
  handleWhichPeople=(e)=>{
    console.log(e);
    this.setState({whichPerson:e,
                    whichChannel:''});
    Meteor.call('findUserbyId',e,(err,res)=>{
      if(err)console.log(err);
      if(res){
        this.setState({messageName:res.profile.firstName});
      }
    });


  }
  render(){
      console.log(this.props);
      return(
          <div className="container">
            <div className="card-panel">
              <div className="row">
                <div style={{borderRight:'1px solid #eeeeee',height:'80vh'}} className="col l4 m4">
                {this.props.ready ?
                    <SidePanel
                      handleGreatGPClickPerson={this.handleWhichPeople}
                      handleGreatGParentClick={this.handleWhichChannel}
                      job={this.props.job}/>
                    :
                    <MSpinner/>
                }

                </div>
                <div className="col l8 m8">
                  {this.props.ready ?
                      <MainPanel
                      name={this.state.messageName}
                      channelId={this.state.whichChannel}
                      userId={this.state.whichPerson}
                      jobId={this.props.job._id}/>
                      :
                      <div className="flex-center">

                        <MSpinner size={"150px"}/>
                      </div>
                  }
                </div>


              </div>
          </div>
        </div>

      )
  }

}
export default JobChat = withTracker(params  => {
  const handle = Meteor.subscribe('one-job',params.match.params.value);
  const ready  = handle.ready();
  let job = Job.find({}).fetch()[0];
  console.log(params.match.params.value);

    return {
        ready: ready,
        handle:handle,
        job:job
    };
})(JobChatPage);
