import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { createContainer } from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import DeleteUser from './Settings/DeleteAccount';
import EditProfile from './Settings/EditProfile';

class Settin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };
    render(){
        return(
          <MuiThemeProvider>
              <div>
                  <br/>
                  <Tabs
                      style={{width:'100%'}}
                      //tabItemContainerStyle={{backgroundColor:'red'}} incase you wanna change tab colors
                      value={this.state.value}
                      onChange={this.handleChange}>
                      <Tab label="Edit Profile" value="a">
                          <EditProfile user={this.props.user}/>
                      </Tab>
                      <Tab label="Delete User" value="b">
                          <DeleteUser user={this.props.user}/>
                      </Tab>
                  </Tabs>
              </div>
          </MuiThemeProvider>
        )
    }
}
export default Settings = createContainer(({ params }) => {
    return {
        user: Meteor.user(),
    };
}, Settin);
