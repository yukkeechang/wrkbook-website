import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link} from 'react-router-dom'; 

export default class DeleteUser extends React.Component{
    deleteUser(e){
        Meteor.call('deleteUser',this.props.user._id,function(err,res){
          if(err){
            console.log(err);
          }else{

          }
        });
    }
    render(){
        return(
            <MuiThemeProvider>
                <div style={{margin:'20px'}}>
                    <Link onClick={this.deleteUser.bind(this)} to="/"><RaisedButton
                        label="Delete your account"
                        secondary={true}/>
                    </Link>
                  </div>
            </MuiThemeProvider>
        )
    }
}
