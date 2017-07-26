import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import MapsMap from 'material-ui/svg-icons/maps/map';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ReactStars from 'react-stars';
import Avatar from 'material-ui/Avatar';
import JobSchema from '../../../../api/Schemas/jobSchema';
class EmployeeComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
          width: 120,
        }





    }
    handleDecline(){
      let job = this.props.jobinfo;
      let declineemployeeIds = [];
      let employeeId = this.props.employeeId;
      let jobId = job._id;
      if(job.admitemployeeIds.includes(employeeId)){
        let idx = job.admitemployeeIds.indexOf(employeeId);
        job.admitemployeeIds.splice(idx, 1);

      }
      if(job.applyemployeeIds.includes(employeeId)){
        let idx = job.applyemployeeIds.indexOf(employeeId);
        job.applyemployeeIds.splice(idx, 1);

      }
      declineemployeeIds = job.declineemployeeIds;
      declineemployeeIds[declineemployeeIds.length] = this.props.employeeId;
      let set = new Set(declineemployeeIds);
      declineemployeeIds = Array.from(set);





      Meteor.call('updateEmployeeIds',jobId,job.applyemployeeIds,job.declineemployeeIds,
      job.admitemployeeIds,(err)=>{
        if (err) {
          console.log(err);
        }else{


        }

      });
    }
    handleAdmit(){
      let job = this.props.jobinfo;
      let employeeId =  this.props.employeeId;
      let applyemployeeIds = [];
      let jobId = job._id;

      if(job.applyemployeeIds.includes(employeeId)){
        let idx = job.applyemployeeIds.indexOf(employeeId);
        job.applyemployeeIds.splice(idx, 1);
        console.log(job.applyemployeeIds);
      }
      admitemployeeIds = job.admitemployeeIds;
      admitemployeeIds[admitemployeeIds.length] = employeeId;
      let set = new Set(admitemployeeIds);
      admitemployeeIds = Array.from(set);



      Meteor.call('updateEmployeeIds',jobId,job.applyemployeeIds,job.declineemployeeIds,
      job.admitemployeeIds,(err)=>{
        if (err) {
          console.log(err);
        }else{


        }

      });
    }
    updateDimensions(){

      let newwidth = document.getElementById('stuff').clientWidth;

      if (newwidth > 240) {
        this.setState({
          width: 240,
        });
      }
      else{
        this.setState({
          width: newwidth,
        });
      }

    }
    componentDidMount() {
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render(){

        return (
        <MuiThemeProvider>
          <div id='greyBorder'>
            <Card zDepth={1}>
            <br/>
            <div className="row">
              <div className="column _30" id="stuff">
                <div className="personImage">
                  <Avatar
                   backgroundColor='#99ddff'
                  size={this.state.width}
                  >
                    {this.props.profile.firstName[0]}
                  </Avatar>
                </div>
              </div>

              <div className="column _70">

                <div className="row">
                    <CardTitle
                      title={this.props.profile.firstName}/>
                </div>

                <div className="row">
                    <CardText>
                      Location, {this.props.profile.employeeData.location.locationName}
                    </CardText>
                </div>


                <div className="row">
                  <CardText>
                  <b>About </b> <br/>
                  {this.props.profile.employeeData.details.text}
                  </CardText>
                </div>


              </div>

              <div className="row">

                <div className="row">
                  <FlatButton
                  hoverColor="#4d94ff"
                  label="Decline"
                  onTouchTap={this.handleDecline.bind(this)}
                  />
                </div>
                <br/>
                {
                  !this.props.isAdmitted &&

                  <div className="row">
                    <FlatButton
                    hoverColor="#4d94ff"
                    label="Hire"
                    onTouchTap={this.handleAdmit.bind(this)}
                    />
                  </div>
                }


              </div>


            </div>

            </Card>
          </div>
        </MuiThemeProvider>
        );
    }



}
export default EmployeeComponent;
