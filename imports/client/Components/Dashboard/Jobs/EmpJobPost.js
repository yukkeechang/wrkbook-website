import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MapsMap from 'material-ui/svg-icons/maps/map';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class EmpJobPost extends React.Component {
    constructor(props){
        super(props);
        let showboii = false;
        let dropButton = this.props.isAdmitted;
        showboii = this.props.jobinfo.applyemployeeIds.includes(Meteor.userId());


        let label = showboii ? 'Applied': 'Apply';
        this.state={
            name:'',
            load: true,
            label:label,
            showapply: showboii,
            dropButton:dropButton
        };
        Meteor.call('findUserbyId', this.props.jobinfo.employerId, function(err,res){
            if(err) {
              console.log(err);

            }
            else{
              if(res){
                let crap = res.profile.employerData.companyName.text;
                console.log(crap);
                this.setState({
                  name:crap,
                  load: false
                });
              }



            }
        }.bind(this));
    }


    handleApply(){
        let job = this.props.jobinfo;
        let applyemployeeIds = [];
        let jobId = job._id;

        applyemployeeIds = job.applyemployeeIds;
        applyemployeeIds[applyemployeeIds.length] = Meteor.userId();
        let set = new Set(applyemployeeIds);
        applyemployeeIds = Array.from(set);
        job.applyemployeeIds = applyemployeeIds;


        Meteor.call('updateEmployeeIds',jobId,job.applyemployeeIds,job.declineemployeeIds,
        job.admitemployeeIds,(err)=>{
          if (err) {
            console.log(err);
          }else{
            this.setState({
              label: 'Applied',
              showapply : !this.state.showapply
            });

          }

        });
    }

    render(){
        return(
            <MuiThemeProvider>
                <div className='greenBorder'>
                    <Card>
                        <CardTitle
                            title={this.props.title}
                        />
                        <div className="row">
                            <div className="column _45">
                                <CardText>
                                    <b>Contractor: </b> {this.state.name}
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
                                    <b>Location: </b>
                                    <br/>
                                    {this.props.location.locationName}
                                </CardText>
                                <CardText>
                                    <b>Pay: </b>
                                    ${this.props.pay}/hr
                                </CardText>
                            </div>
                            <div className="column _45">
                                <CardText>
                                    <b>Addition Text: </b>
                                    <br/>
                                    {this.props.jobinfo.additionText.text}
                                </CardText>
                            </div>
                            <div className="column _10">
                                <br/>
                                { !this.state.dropButton &&
                                  <div className="row">
                                      <div className="applyButton">
                                          <FlatButton
                                              onTouchTap={this.handleApply.bind(this)}
                                              disabled={this.state.showapply}
                                              hoverColor="#4d94ff"
                                              label={this.state.label}
                                          />
                                      </div>
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
export default EmpJobPost;
