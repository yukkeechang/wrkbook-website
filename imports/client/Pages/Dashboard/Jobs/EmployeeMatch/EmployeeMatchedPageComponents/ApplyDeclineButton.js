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

  componentWillUnmount(){

          $(this.refs.declineModal).modal('close');
          $(this.refs.applyModal).modal('close');
  }
  render(){
    return(

    <div className="row center-align">
        <br/>
          <div  className="col s6 center-align offset-s3">
            <a style={{color:'white',width:'100%',paddingTop:'5px',
                        textTransform:'none',height:'45px',fontSize:'18px',
                        borderRadius:'20px',border:'2px solid #a7ffeb'}}
                        id="applydButton"
                        className={this.props.isDecline|| this.props.isApplied ?
                                  "waves-effect teal lighten-1 btn-flat disabled"
                                  : "waves-effect teal lighten-1 btn-flat"}
                                  onClick={this.openApplyModal}>
              {this.props.isApplied ? 'Applied': 'Apply!'}
            </a>
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
          </div>
      </div>

  );
  }
}
