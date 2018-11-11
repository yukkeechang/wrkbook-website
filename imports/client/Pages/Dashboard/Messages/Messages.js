import React from 'react';
import { Meteor } from 'meteor/meteor';
import JobChat from './PageComponents/SingleJobChat';
import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../Shared/MSpinner';
class Home extends React.Component {
  constructor(props) {
    super(props);


  }
  componentWillUnmount(){
    this.props.handle.stop();
  }
  render(){

      return(
        <div>
        <div className="row">
            <div className="container">
            <h1 className="center-align">Job Chats</h1>
            </div>
        </div>
        {!this.props.ready ? <div className="row"><div className="col s4 offset-s4"style={{textAlign: 'center'}}><MSpinner /></div></div> :
        <div className="container">
          <div style={{borderRadius:'10px'}} >

            {

              this.props.jobs.length>0 ?
              this.props.jobs.map((job,index)=>{
                return(
                  <div  key={job._id}>
                    <JobChat job={job}/>

                  </div>
                )
            }):
            <h1 className="center-align">No Active Chats</h1>
            }
          </div>
        </div>
        }
        </div>
      )
  }

}
export default NotficationsHome = withTracker(({params})  => {
    let handle = Meteor.subscribe('active-jobs');
    let ready = handle.ready();

    return {
        ready: ready,
        handle:handle,
        jobs: Job.find({}).fetch()
    };
})(Home);
