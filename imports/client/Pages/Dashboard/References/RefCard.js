import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import NewRef from './NewRef';

function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}

class Ref extends Component{
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('.modal').modal();
      $('select').material_select();
    });
    console.log(this.props);
  }
  constructor(props){
      super(props);
  }
  toolTipFix(){
    $('#tool').tooltip('remove');
  }
  render(){
    if(!isEmpty(this.props.myRefs)){
      let refs = this.props.myRefs;
      return(
        <div>
          <div className="row">
            <div className="col s8">
              <h4 className="card-title" style={{display:'flex', justifyContent:'center'}}>References</h4>
            </div>
            <div className="col s4 hide-on-small-only" style={{display:'flex', alignItems:'center'}}>
              <Link to={"/references"}>
                <a className="waves-effect waves-light btn"><i className="small material-icons left">edit</i>Add/Edit</a>
              </Link>
            </div>
            <div className="col s4 hide-on-med-and-up">
              <Link to={"/references"}>
                <a className="waves-effect waves-teal lighten-3 btn-flat hide-on-med-and-up" style={{display:'flex', alignItems:'center', justifyContent:'center'}} onClick={this.toolTipFix.bind(this)}>
                  <i ref="tool" id="tool" className="small material-icons tooltipped" data-html="true" data-background-color="#888"data-tooltip="Add/Edit">edit</i>
                </a>
              </Link>
            </div>
          </div>
          {refs.map((ref, index)=>{
            return(
              <div className="col s12 m6" key={index}>
                <div className="card">
                  <div className="card-content">
                    <p>{ref.name.text}</p>
                    <p>{ref.companyName.text}</p>
                    <p>{ref.email}</p>
                    <p>{ref.phone}</p>
                    <p>{ref.position.text}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      );
    }
    else{
      return(
        <NewRef/>
      )
    }
  }
}
export default RefCard = createContainer(({ params }) => {
    let handle = Meteor.subscribe('your-references');
    let ready = handle.ready();
    return {
        ready: ready,
        myRefs: References.find({}).fetch()
    };
}, Ref);
