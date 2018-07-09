import React, {Component} from 'react';
import MTextField from '../../Shared/MTextField';
import Button from '../../Shared/Button'

export default class CollectEmails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pro: true,
      buttonColor: 'fill-dark-gray',
      buttonText: 'Submit',
      isEmail: true,
      nameEmpty: false,
      emailEmpty: false
    }
  }

  CreateLead(e) {
    console.log(this.state.nameEmpty)
    e.preventDefault()
    let lead = {
      name: this.refs.name.value(),
      email: this.refs.email.value(),
      isPro: this.state.pro
    };

    Meteor.call('createLead', lead, (err)=> {
      if(err) {
        this.setState(err.reason);
      } else {
        this.setState({buttonColor: 'fill-green', buttonText: 'Submitted'})
      }
    });
  }
  pro() {
    this.setState({pro: true})
  }

  con() {
    this.setState({pro: false});
  }

  render() {

    let empty = "This cannot be empty";
    let validState = this.state.isEmail ? '' : "This email must be valid"
    return (
      <div style={{backgroundColor: 'white'}}>
        <div className="section"/>
        <h4 className="center-align container how-to-heading" style={{fontFamily: 'Montserrat-Medium'}}>Made for construction professionals and contractors</h4>
        <div className="center-align container" style={{fontFamily: 'Montserrat-Italic', color:'#9B9B9B'}}>Sign up today for to get notified when our beta 2.0 comes out! </div>
        <div className="row container">
          <div className="col m4 l4">
            <MTextField label="Name" ref="name" id="name" error={this.state.nameEmpty ? empty : ''}/>
          </div>
          <div className="col m4 l4">
            <MTextField label="Email" ref="email" id="email" error={this.state.emailEmpty ? empty : validState }/>
          </div>
          <div className="col m4 l4">
            <div className="section"/>
            <div>
              <input type="radio" id="pro" ref="pro" checked= {this.state.pro ? this.state.pro : ''} onClick={this.pro.bind(this)}/>
              <label htmlFor="pro">Professional/Skilled trade worker</label>
            </div>
            <div>
              <input type="radio" id="con" ref="con" checked= {this.state.pro ? '' : 'checked'} onClick={this.con.bind(this)}/>
              <label htmlFor="con">Contractor</label>
            </div>
          </div>
        </div>
        <div className="row center-align " style={{position: 'relative'}}>
          <Button className= {`button-sh col s12 m4 l4 offset-l4 offset-m4 ${this.state.buttonColor}`  }  paddingTop='5px' onClick={(e) => this.CreateLead(e)} text={"white"} to=''>{this.state.buttonText}</Button>
        </div>
      <div className="section"/>
    </div>
    )
  }



}
