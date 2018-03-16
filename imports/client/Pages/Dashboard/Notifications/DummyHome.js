import React from 'react';
import { Meteor } from 'meteor/meteor';
import Things from './NavBar/NotificationsNav'
export default class Home extends React.Component {
  constructor(props) {
    super(props);


  }
  componentDidMount(){
    // console.log(this.props);

  }
  render(){

      return(

          <Things/>
      )
  }

}
