import React from 'react';

import ReactDOM from 'react-dom';

export default class EditCard extends React.Component{

  constructor(props){
    super(props);

    this.state={
      dist: 20,
      about:'',
      validLang: true
    }

  }
  componentDidMount(){
    let title = ReactDOM.findDOMNode(this.refs.langs);
    $(title).formSelect();
    let ea = ReactDOM.findDOMNode(this.refs.ca);
    $(ea).characterCounter();
    $(ea).val(this.state.about);
    M.textareaAutoResize($(ea))
    let dist = ReactDOM.findDOMNode(this.refs.dist);
    noUiSlider.create(dist, {
        start: [20],
        connect: true,
        step: 1,
        orientation: 'horizontal',
        range: {
            'min': 0,
            'max': 100
        },
        format: wNumb({
            decimals: 0
        })
    });
    dist.noUiSlider.on('change',(value, handle)=>{
        this.setState({dist: parseInt(value[0])});
    });
  }
  onHandleSave=()=>{
    this.props.onButtonClick();
  }
  render(){
    return(

      <div className="card-content">
        <div className="row">
          <div className="col s12">
            <div className="input-field">
                <textarea ref="ca" id="about" className="materialize-textarea" data-length="250"></textarea>
                <label htmlFor="about">About You</label>
            </div>

          </div>
          <div className="input-field col s12">
          <select
          size="2" className={this.state.validLang ? '':"invalid"} multiple ref="langs" defaultValue={["0"]}>
            <option value="0" disabled>Choose one or more</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Chinese">Chinese</option>
            <option value="French">French</option>
            <option value="Tagalog">Tagalog</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Arabic">Arabic</option>
            <option value="Korean">Korean</option>
            <option value="German">German</option>
            <option value="Russian">Russian</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Italian">Italian</option>
            <option value="Polish">Polish</option>
          </select>
          <label>Languages I Speak *</label>
          </div>

          <div className="col s12">
              <p className="gen-text" style={{color:'#9e9e9e',marginBottom:'8px'}}>Distance You are willing to travel <span style={{fontWeight:'bold'}}>{this.state.dist} miles</span></p>
              <div ref="dist"></div>
          </div>

        </div>

        <div className="row">
        <div className="col s12 center-align">
          <div onClick={this.onHandleSave}style={{width:'40%'}} className="teal darken-1  roundish-button-flat">
            Save
          </div>
        </div>

        </div>

      </div>
    )
  }

}
