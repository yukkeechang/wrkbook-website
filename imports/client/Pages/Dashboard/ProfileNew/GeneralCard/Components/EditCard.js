import React from 'react';
import MTextField from '../../../../Shared/MTextField';
import Location from '../../../../Shared/Location';
import ReactDOM from 'react-dom';

export default class EditCard extends React.Component{

  constructor(props){
    super(props);

    this.state={
      validJobTitles: true
    }

  }
  componentDidMount(){
    let title = ReactDOM.findDOMNode(this.refs.titles);
    $(title).formSelect();
  }
  onHandleSave=()=>{
    this.props.onButtonClick();
  }
  render(){
    return(

      <div className="card-content">
        <div className="row">
          <div className="col s12">
            <MTextField  label="Name"/>

          </div>
          <div className="input-field col s12">
              <select
               size="2" className={this.state.validJobTitles? '':"invalid"} multiple ref="titles" defaultValue={["0"]}>
              <option value="0" disabled>Choose one or more</option>
              <option value="Painter">Painter</option>
              <option value="Demolititoner">Demolititoner</option>
              <option value="Masonry/Stone Worker">Masonry/Stone Worker</option>
              <option value="Concrete Finisher">Concrete Finisher</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Heat/Air conditioning Worker">Heat/Air conditioning Worker</option>
              </select>
              <label>Job Titles *</label>
          </div>

          <div className="col s12">
              <Location/>
          </div>
          <div className="card-title center-align to-bold">
            <p>Contact</p>
          </div>
          <div className="col s12">
              <MTextField  label="Number"/>
          </div>
          <div className="col s12">
              <MTextField  label="Email"/>
          </div>
          <div className="col s12">
              <MTextField  label="Confirm Email"/>
          </div>

          <div className="col s12 center-align">
            <div onClick={this.onHandleSave} style={{width:'50%'}} className="teal darken-1  roundish-button-flat">
              Save
            </div>
          </div>
        </div>

      </div>
    )
  }

}
