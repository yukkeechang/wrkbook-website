import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import MapsMap from 'material-ui/svg-icons/maps/map';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import SocialPeople from 'material-ui/svg-icons/social/people';
import EmployeeComponent from './employeeComponent';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import EditJob from './EditJob';
class JobPostEmployer extends React.Component {
    constructor(props){
        super(props);
        let job = this.props.jobinfo;
        this.state={
          expand: false,
          applied: [],
          admit: [],
          job: job,
          open:false,
          nothing1:true,
          nothing2:true
        };





    }
    handleEdit(e){
      this.setState({open:!this.state.open});

    }
    handleMemeber(e){
      this.setState({expand:!this.state.expand});
      let job = this.props.jobinfo;
      let Admitted = [];
      let Applied =[];
      let crap =job.admitemployeeIds;
      console.log(job);
      if(job.admitemployeeIds.length > 0){
        job.admitemployeeIds.map((_id,i)=>{
          Meteor.call('findUserbyId',_id,(err,res)=>{
            if(err)console.log(err);
            else{
              Admitted.push(res);
              this.setState({
                admit: Admitted,
                nothing2: false
              })
            }
          });
        });
      }
      if(  job.applyemployeeIds.length > 0){
        job.applyemployeeIds.map((_id,i)=>{
        Meteor.call('findUserbyId',_id,(err,res)=>{
              console.log('halp');
            if(err){
              console.log(err);
            }else{
              Applied.push(res);
              this.setState({
                applied: Applied,
                nothing1: false
              })
            }

          });

        });
      }

      let nothing2 = Admitted.length > 0 ? false: true;
      console.log(nothing2);
      this.setState({
        nothing2:nothing2,
        job:job
      });
      console.log(this.state.job);
      console.log(this.state.applied);
      console.log(Admitted);



    }
    handleDialog(e){
      this.setState({open:!this.state.open});
    }




    render(){

        return (
        <MuiThemeProvider>
          <div className='greenBorder'>
            <Card>
            <div className="row">
                <div className="column _70">
                  <CardTitle
                      title={this.props.title}
                  />
                </div>
                <div className="column _30">
                  <div className="row" >


                      <FlatButton
                        label="Edit Job"
                        labelPosition="before"
                        primary={true}
                        icon={<ActionSettings/>}
                        onTouchTap={this.handleEdit.bind(this)}
                      />


                      <FlatButton
                        label="Manage Employees"
                        labelPosition="before"
                        primary={true}
                        icon={<SocialPeople/> }
                        onTouchTap={this.handleMemeber.bind(this)}
                      />


                  </div>
                </div>
              </div>
              <div className="row">
                <div className="column _50">


                  <CardText>
                  <b>Contractor: </b> <i>{Meteor.user().profile.employerData.companyName.text}</i>
                  </CardText>
                  <CardText>
                    <b>Start Time: </b> {this.props.startAt.toLocaleString()}
                  </CardText>
                  <CardText>
                    <b>End Time: </b> {this.props.endAt.toLocaleString()}
                  </CardText>
                  <CardText>
                    <b>Description: </b>
                    <br/>
                    {this.props.description}
                  </CardText>
                  <CardText>
                      <b>Location: </b> <br/>{ this.props.location.locationName}


                  </CardText>
                  <CardText>
                    <b>Pay: </b> ${this.props.pay}/hr
                  </CardText>

                </div>
                <div className="column _50">

                  <CardText>
                    <b>Addition Text: </b>
                    <br/>
                    {this.props.jobinfo.additionText.text}
                  </CardText>

                </div>
                </div>
                <div className = "row">
                  <Card expanded={this.state.expand}
                  zDepth={0}>
                  <CardMedia expandable={true}
                  >
                    <div className="row">
                      <div className='cloumn _5'/>
                      <div className ='column _30' >
                          <div className ='row'>
                          {this.state.nothing1 &&
                            <CardTitle
                                title='No Professionals have applied'
                            /> }

                            {
                              !this.state.nothing1 &&
                                <CardTitle
                                    subtitle='Professionals that applied'
                                />
                            }
                          </div>
                          <Paper style={{maxHeight: 350, overflow: 'auto'}}>
                          <List>
                              {
                                this.state.applied.map(function(user,index){
                                  return (
                                      <ListItem

                                      primaryText={    < EmployeeComponent
                                          key ={index}
                                          jobinfo = {this.state.job}
                                          employeeId = {user._id}
                                          profile = {user.profile}
                                          isAdmitted={false}

                                          />
                                        }

                                    />

                                  )
                                }.bind(this))
                              }
                        </List>
                        </Paper>
                        </div>
                        <div className="column _5"/>
                        <div className ='column _30' >
                          <div className ='row'>
                          {this.state.nothing2 &&
                            <CardTitle
                                title='There are no admitted Professionals for this job'
                            /> }

                            {
                              !this.state.nothing2 &&
                                <CardTitle
                                    subtitle='Admitted Professionals'
                                />
                            }
                            </div>
                            <Paper style={{maxHeight: 350, overflow: 'auto'}}>
                            <List
                            >
                          {
                            this.state.admit.map(function(user,index){
                             return (
                               <ListItem

                               primaryText={
                                < EmployeeComponent
                                key ={index}
                                jobinfo = {this.state.job}
                                employeeId = {user._id}
                                profile = {user.profile}
                                isAdmitted={true}
                                />
                              }
                              />

                              )
                            }.bind(this))
                          }
                          </List>
                          </Paper>
                          </div>
                          <div className='column _5'/>
                      </div>

                  </CardMedia>
                  </Card>
                </div>

                <Dialog

                  modal={false}
                  open={this.state.open}
                >
                  {
                    <EditJob jobs={this.state.job}
                    onSelect={this.handleDialog.bind(this)}/>

                  }
                </Dialog>





            </Card>
            </div>
        </MuiThemeProvider>
        );
    }



}
export default JobPostEmployer;
