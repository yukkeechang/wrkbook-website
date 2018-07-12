import React from 'react';
import { Meteor } from 'meteor/meteor';
import PersonCard from './PersonCard';
import { withTracker } from 'meteor/react-meteor-data';


class PeopleList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      employer : {}
    }

  }
  componentWillMount(){
    Meteor.call('findUserbyId',this.props.job.employerId,(err,res)=>{
      console.log(res);
      this.setState({
        employer: res
      });
    });
  }
  componentDidMount(){
    // console.log(this.props);

  }
  componentWillUnmount(){
    this.props.handle.stop();
  }
  handleClick =(e)=>{
    this.props.handleGrandParentClickPerson(e)
  }
  render(){
      return(

        <div>
          <div style={{marginBottom:'0px'}}className="row">
            <div className="col center-align s12">
              <h5>Direct Message</h5>
            </div>
          </div>
          {
            !!this.state.employer._id&&
            <div>
                <ul className="collection">
                   <li style={{backgroundColor:'transparent'}} className="collection-item">
                   <PersonCard jobId={this.props.job._id} handleParentClick={this.handleClick} userId={this.state.employer._id} imageId={this.state.employer.profile.employerData.image}
                     name={`${this.state.employer.profile.firstName} ${this.state.employer.profile.lastName}`} icon={<i style={{color:'#00bcd4'}} className="material-icons">security</i>}/>
                   </li>
                </ul>
          </div>

          }


            <ul className="collection">
          {
            this.props.people.map((person,index)=>{
              return(
                 <li style={{backgroundColor:'transparent'}} className="collection-item">
                  <PersonCard jobId={this.props.job._id} handleParentClick={this.handleClick} userId={person._id} imageId={person.profile.employeeData.image}
                    name={`${person.profile.firstName} ${person.profile.lastName}`} />
                 </li>

              )
            })
          }
          </ul>

        </div>

      )
  }

}
export default PersonPanel = withTracker(params => {
    let handle = Meteor.subscribe('admit-employee-job',params.job._id);
    let ready = handle.ready();
    return {
        ready: ready,
        handle:handle,
        people: Meteor.users.find({_id: {$in: params.job.admitemployeeIds}}, {fields: { emails: 1, profile: 1 } }).fetch()
    };
})(PeopleList);
