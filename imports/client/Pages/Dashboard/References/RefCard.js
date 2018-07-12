import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

export default class RefCard extends Component{
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('.modal').modal();
      $('select').material_select();
    });

  }
  constructor(props){
      super(props);
  }
  toolTipFix(){
    $('#tool').tooltip('remove');
  }
  render(){
      let ref = this.props.reference;
      return(

                <div className="section">
                  <div className="card-content">
                    <div className="row">
                      <div className="col s6">
                        <p>{ref.name.text}</p>
                        <p>{ref.companyName.text}</p>
                      </div>
                      <div className="col s6">
                        <p>{ref.phone}</p>
                        <p>{ref.email}</p>
                      </div>
                    </div>
                    <p>{ref.position.text}</p>
                  </div>
                <div className="divider"></div>
                </div>




      );
  }
}
