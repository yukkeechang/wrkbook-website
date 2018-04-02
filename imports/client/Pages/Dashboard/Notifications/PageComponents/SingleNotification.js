import React from 'react';
import Avatar from '../../../Shared/Avatar';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

class NotificationCard extends React.Component {
  constructor(props) {
    super(props);


  }
  componentDidMount(){
    // console.log(this.props);
    console.log(this.props);
  }
  render(){

      let green = '#7ED0B0'
      let blue = '#93BDED';
      let red = '#FF919F';
      return(


          <div className="row">

              <div style={{height: '100%'}} className="col m3 offset-m1 s12 center-align">
                <div style={{ display: 'flex',flexWrap: 'wrap',justifyContent:'center'}}>
                  <Avatar size={150} letter={'A'}/>
                </div>

              </div>
            <div className="col m8 s12">
              <div style={{marginBottom:'1px'}} className="row">
                  <div className="col s12">
                  {
                    (this.props.notification.typeNotifi == "MATCH" ?
                      <h5> <b>New Job Match! </b>  {!this.props.notification.seen&&<span style={{fontSize:'larger',color:'#FF919F'}}> <i> New </i> </span>}</h5>
                      :
                      (this.props.notification.typeNotifi == "APPLIED" ?
                          <h5> <b>New Professionals</b>  {!this.props.notification.seen&&<span style={{fontSize:'larger',color:'#FF919F'}}> <i> New </i> </span>}</h5>
                          :
                          (this.props.notification.typeNotifi == "HIRED" ?
                            <h5> <b>You're Hired </b>  {!this.props.notification.seen&&<span style={{fontSize:'larger',color:'#FF919F'}}> <i> New </i> </span>}</h5>
                            :
                            (this.props.notification.typeNotifi == "REMOVE" ?
                              <h5> <b>Job Deleted </b>  {!this.props.notification.seen&&<span style={{fontSize:'larger',color:'#FF919F'}}> <i> New </i> </span>}</h5>
                              :
                              null
                            )
                          )
                      )
                    )
                  }

                  </div>
              </div>
              {
                this.props.notification.typeNotifi == "MATCH" ?

                <div className="row">
                  <div className="col m12">
                    <div className="row">
                        <div className="cols m12">
                          <h6>{this.props.notification.description}</h6>
                        </div>
                    </div>
                    <div className="row">
                      <div style={{borderRadius:'5px',backgroundColor:'#eeeeee'}} className="col m6 s6">
                        {!!this.props.job&&
                          <div>
                          <h6 style={{fontSize:'larger'}}><b>Job Details</b></h6>
                          <h6 style={{fontWeight:'bolder'}}>Pay:<span style={{fontWeight:'normal'}}> ${this.props.job.professionals[0].pay}/hr</span></h6>
                          <h6 style={{fontWeight:'bolder'}}>Location: <span style={{fontWeight:'normal'}}>{this.props.job.location.locationName}</span></h6>
                          <h6 style={{fontWeight:'bolder'}}>Profession: <span style={{fontWeight:'normal'}}>{this.props.job.jobTypes.texts[0]}</span></h6>
                          </div>
                        }

                      </div>
                      <div style={{height:'100px'}}className="col m4 s6 valign-wrapper">
                        <Link to={this.props.notification.href}>
                          <a style={{width:'100%',borderRadius:'20px', backgroundColor:'#7ED0B0',color:'white'}} className="btn-flat center-align">Apply Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>

                :

                <div className="row">
                  <div className="col m8 s6">
                      <h6>{this.props.notification.description}</h6>
                  </div>
                  <div className="col m4 s6 valign-wrapper">
                  {
                    (this.props.notification.typeNotifi == "APPLIED" ?
                        <Link to={this.props.notification.href}>
                          <a style={{width:'100%',borderRadius:'20px', backgroundColor:'#93BDED',color:'white'}} className="btn-flat center-align">View Job</a>
                        </Link>
                        :
                        (this.props.notification.typeNotifi == "HIRED" ?
                          <Link to={this.props.notification.href}>
                            <a style={{width:'100%',borderRadius:'20px', backgroundColor:'#9ccc65',color:'white'}} className="btn-flat center-align">Apply Now</a>
                          </Link>
                          :
                          (this.props.notification.typeNotifi == "REMOVE" ?
                            <Link to={this.props.notification.href}>
                              <a style={{width:'100%',borderRadius:'20px', backgroundColor:'#FF919F',color:'white'}} className="btn-flat center-align">View Now</a>
                            </Link>
                            :
                            null
                          )
                        )
                    )
                  }

                  </div>
                </div>


              }

            </div>


          </div>





      )
  }

}

export default SingleNotification = withTracker(params =>{
  let handle = Meteor.subscribe('one-job',params.notification.jobId);
  let ready = handle.ready();
  console.log(params);
  // console.log(Job.find({}).fetch()[0]);
  return{
    ready: ready,
    job: Job.find({_id:params.notification.jobId}).fetch()[0]
  }

})(NotificationCard)
