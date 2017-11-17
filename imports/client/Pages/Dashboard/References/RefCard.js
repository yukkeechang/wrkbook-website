import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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
  render(){
    if(!isEmpty(this.props.myRefs)){
      let refs = this.props.myRefs;
      return(
        <div>
          <h4 className="card-title" style={{display:'flex', justifyContent:'center'}}>References</h4>
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
      );
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
