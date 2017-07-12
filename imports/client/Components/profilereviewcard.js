import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactStars from 'react-stars';
import Divider from 'material-ui/Divider';

export default class ProfileReviewComponent extends React.Component{
  constructor(props){
    super(props);
    var full_name = props['full_name'];
    var profile_review =props['profile_review'];
    var avatar_pic_1 = props['avatar_pic_1'];

    this.state ={
      isEdit: true,
      ratingValue:3,
    }
  }
  ratingChanges(newRating){
    this.setState({isEdit: !this.state.isEdit});
    this.setState({ratingValue: newRating});
    console.log(newRating);
  }

  render(){
    return(
      <MuiThemeProvider>
        <Card>
          <CardHeader/>
          <CardMedia actAsExpander={true} showExpandableButton={true}>
            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
              <div id= "left_side_image" style={{width:'50%'}}>
                <Avatar
                  src={this.props.avatar_pic_1}
                  size={150}/>
              </div>
              <div id = "right_side_image"
                style ={{padding:'7px'}}>
                <h1 style= {{fontWeight:'bolder',fontSize:'2em'}}>{this.props.full_name}</h1>
                <ReactStars
                  count ={5}
                  size={30}
                  color2={'#4169E1'}
                  value ={this.state.ratingValue}
                  onChange ={this.ratingChanges.bind(this)}/>
              </div>
            </div>
          </CardMedia>
          <CardText expandable={true}>
            <h2 style ={{
              fontFamily:'sans-serif',
              fontWeight:'lighter',
              marginTop:'2px',
              marginBottom:'8px',}}>
              {this.props.profile_review}
            </h2>
          </CardText>
        </Card>
      </MuiThemeProvider>
    )
  }
}
