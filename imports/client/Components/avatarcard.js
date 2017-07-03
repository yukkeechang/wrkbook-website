import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class AvatarCardComponent extends React.Component{
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
          <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange.bind(this)}>
            <CardHeader
              title={this.props.full_name}
              subtitle={this.props.positon_name}
              avatar={this.props.avatar_pic_1}
              actAsExpander={true}
              showExpandableButton={true}
            />

            <CardMedia
              expandable={true}
            >
            <div id="outer_ava">
              <Avatar
              src={this.props.avatar_pic_2}
              size={500}
              style={{
                width: '50%',
                margin: '0 auto',
              }}
              />
            </div>
            </CardMedia>
            <CardText expandable={true}>
              {this.props.avatar_text}
            </CardText>

          </Card>
        </MuiThemeProvider>

        )
    }
}
