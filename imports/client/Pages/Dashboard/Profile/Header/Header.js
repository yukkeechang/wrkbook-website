import ConHeader from './HeaderComponents/ConHeader';
import ProHeader from './HeaderComponents/ProHeader';
import React from 'react';
import { Roles } from 'meteor/alanning:roles';


export default class Header extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props.url);
    console.log(this.props);
    if(Roles.userIsInRole(this.props.user._id,"PRO")&&this.props.url.length>0){

      return(
            <ProHeader isUser={this.props.isUser} user={this.props.user} url={this.props.url}/>
          )
      }else if(Roles.userIsInRole(this.props.user._id,"CON")&&this.props.url.length>0){
        return(
            <ConHeader isUser={this.props.isUser}user={this.props.user} url={this.props.url}/>
          );

      }else{
        return(
          <h1>WHAT ARE YOU DOING ON THIS PAGE</h1>
        )
      }
  }
}
