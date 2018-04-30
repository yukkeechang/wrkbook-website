import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';
export default class ApplyDeclineButton extends React.Component{

  componentDidMount(){
    let select = ReactDOM.findDOMNode();
    $(select).ready(()=>{
      $('.modal').modal();
      $('select').material_select();
    });
    $(this.refs.titles).on('change',(e)=>{
      this.selectedApply(e);
    });
  }

  constructor(props){
    super(props);
    this.state={
      selectedApply: '',
    };
  }
  handleApply=()=>{
    console.log(this.props.jobID);
    Meteor.call('applyForJob',this.props.jobID, this.state.selectedApply,(err)=>{
      if(err){
        console.log(err);
      }
      else{
          $(this.refs.applyModal).modal('close');
      }
    });
  }
  selectedApply=()=>{

      this.setState({
        selectedApply: this.refs.titles.value,
      });

  }

  openApplyModal=()=>{

    $(this.refs.applyModal).modal('open');
  }
  handleDecline=()=>{

    Meteor.call('declineJob', this.props.jobID, (err)=>{
    if(err){
      console.log(err);
    }
    else{
          $(this.refs.declineModal).modal('close');
          // $('#declineModal').modal('close');
    }
    });
  }
  openDeclineModal=()=>{
    $(this.refs.declineModal).modal('open');
  }
  doNothing=()=>{
    $(this.refs.declineModal).modal('close');
  }

  componentWillUnmount(){

          $(this.refs.declineModal).modal('close');
          $(this.refs.applyModal).modal('close');
  }
  render(){
    return(

    <div className="row center-align">
        <br/>
          <div style={{marginBottom:'10px'}} className="col s6 center-align offset-s3">
            <a style={{color:'white',width:'100%',paddingTop:'5px',
                        textTransform:'none',height:'45px',fontSize:'18px',
                        borderRadius:'12px',border:'1px solid #009688'}}
                        id="applydButton"
                        className={this.props.isDecline|| this.props.isApplied ?
                                  "waves-effect teal lighten-1 btn-flat disabled"
                                  : "waves-effect teal lighten-1 btn-flat"}
                                  onClick={this.openApplyModal}>
              {this.props.isApplied ? 'Applied': 'Apply!'}
            </a>
          </div>

          <div className="col s6 center-align offset-s3 show-on-small hide-on-med-and-up">

            <a style={{paddingTop:'5px',
                    borderRadius:'12px',border:'1px solid #ef9a9a',
                    textTransform:'none',paddingBottom:'5px',width:'100%',
                    height:'45px',fontSize:'17px'}}

                     id="disabledButton" className={this.props.isDecline ? "waves-effect red lighten-5 btn-flat disabled": "waves-effect red lighten-5 btn-flat "} onClick={this.openDeclineModal}  >Decline</a>


          </div>


          <div>
            <div ref="applyModal" id="applyModal" className="modal">
              <div className="modal-content" style={{ overflowY: 'scroll'}}>
                <div className="col s12">
                  <div className="row">
                      <select ref="titles" id="jobTitles">
                        <option value="" disabled selected>Choose employee type to apply as</option>
                        {this.props.jobTitles.map((title, index)=>{
                          return(
                            <option key={index} value={title} >{title}</option>
                          )
                        })}
                      </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="waves-effect waves-green teal lighten-3 btn-flat" onClick={this.handleApply}>
                  Confirm apply.
                </button>
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
      </div>

  );
  }
}
