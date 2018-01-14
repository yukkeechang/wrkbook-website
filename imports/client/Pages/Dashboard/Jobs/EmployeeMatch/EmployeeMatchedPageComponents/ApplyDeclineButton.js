import React from 'react';
import ReactDOM from 'react-dom';


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
  openApplyModal=()=>{

    $(this.refs.applyModal).modal('open');
  }
  openDeclineModal=()=>{
    $(this.refs.declineModal).modal('open');
  }
  render(){
    return(
  <div className="col s12">
    <div className="row">
          <a id="applydButton" className={this.props.isDecline|| this.props.isApplied ? "waves-effect green lighten-3 btn-flat disabled" :"waves-effect green lighten-3 btn-flat"}  onClick={this.openApplyModal}>
            {this.props.isApplied ? 'Applied': 'Apply'}
          </a>
          <a id="disabledButton" className={this.props.isDecline ? "waves-effect red lighten-3 btn-flat disabled": "waves-effect red lighten-3 btn-flat "} onClick={this.openDeclineModal}>
            Decline
          </a>

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
                <button className="waves-effect waves-green green lighten-3 btn-flat" onClick={this.handleApply}>
                  Confirm apply.
                </button>
              </div>
            </div>

            <div ref="declineModal" id="declineModal" className="modal">
              <div className="modal-content">
                <h4>Are you sure you want to decline this job? <br/>Once deleted you can not get this job back.</h4>
              </div>
              <div className="modal-footer">
                <button className="waves-effect waves-red red lighten-3 btn-flat" onClick={this.handleDecline}>
                  I am sure.
                </button>
              </div>
            </div>

          </div>
      </div>
    </div>
  );
  }
}
