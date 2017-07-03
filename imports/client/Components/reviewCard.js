import React from 'react';
import  {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
// import StarRatings from 'react-star-ratings';

export default class ReviewCard extends React.Component{
  constructor(props){
      super(props);
      var full_name = props['full_name'];
      var positon_name =props['positon_name'];
      var avatar_pic_1 = props['avatar_pic_1'];
      var avatar_pic_2 = props['avatar_pic_2'];
      var avatar_text = props['text'];

      this.state ={
        expanded: false,
      }

  }

  handleExpandChange(expanded){
    this.setState({expanded: expanded});
  }
  handleExpand(){
    this.setState({expanded: true});
  }

  handleReduce(){
    this.setState({expanded: false});
  }

  render(){
  return(
    <MuiThemeProvider>
      <Card class="cards">
        <CardHeader
          title="Big Smoke"//{this.props.full_name}
          subtitle="Little Smoke"//{this.props.positon_name}
          avatar="images/handshake.png"//{this.props.avatar_pic_1}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          expandable card text here
          //{this.props.avatar_text}
        </CardText>
      </Card>
    </MuiThemeProvider>
  )
  }
}
