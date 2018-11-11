import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

export default class SuperVisorDecline extends React.Component{

  constructor(props){
    super(props);

  }
  componentDidMount(){
    let select = ReactDOM.findDOMNode();
    $(select).ready(()=>{
      $('select').formSelect();
    })
  }
  handleDecline=()=>{

    Meteor.call('declineJob', this.props.jobID, (err)=>{
    if(err){
      console.log(err);
    }
    else{
          $(this.refs.declineModal).modal('close');
      }
    });
  }
  openDeclineModal=()=>{
    $(this.refs.declineModal).modal('open');
  }
  componentWillUnmount(){
    $(this.refs.declineModal).modal('close');
  }
  doNothing=()=>{
    $(this.refs.declineModal).modal('close');
  }
  render(){
    return(
        <div className="row">
            <div className="row">
                <div className="col l9 m7 s12">
                  <h1 style={{margin:'0px'}} className="truncate" >{this.props.jobTitle}</h1>
                </div>
                <div className="col l3 m5 hide-on-small-only  center-align">

                  <a style={{paddingTop:'5px',
                        paddingBottom:'5px',width:'100%',
                          height:'45px',fontSize:'17px'}}
                           id="disabledButton" className={this.props.isDecline ? "waves-effect red-border thin-border decline-roundish-button-flat  disabled": "waves-effect  black-text decline-roundish-button-flat "} onClick={this.openDeclineModal} >Decline</a>
                </div>
            </div>
            <div className="row">
              <div className="col l8 m8 s8">
                <p>Supervisor: {this.props.supervisorName}</p>
                {
                  this.props.isAdmitted?
                    <p>Phone: {this.props.supervisorPhone}</p>
                    :
                    null
                }
              </div>
          </div>

          <div ref="declineModal" id="declineModal" className="modal">
            <div className="modal-content">
              <div className="row center-align">
                <i style={{fontSize:'100px',color:'#ffe57f '}}className="material-icons">error_outline</i>
              </div>
              <div className="row center-align">
                <h3>Are you sure?</h3>
                <h5>Once you decline, you cannot get this job back. </h5>
              </div>
            </div>

            <div className="modal-footer">
                <div className="col s6">
                  <button style={{width:'100%'}} className="waves-effect blue-grey lighten-5 btn-flat" onClick={this.doNothing}>
                    Cancel
                  </button>
                </div>
                <div className="col s6">
                  <Link to={"/"} onClick={this.handleDecline}>
                    <button style={{width:'100%',border:'1px solid #dd2c00'}} className="waves-effect waves-red red lighten-3 btn-flat" onClick={this.handleDecline}>
                      Yes
                    </button>
                  </Link>
                </div>
            </div>
          </div>
        </div>
      )
    }
  }
