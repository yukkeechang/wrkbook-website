import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'react-slick';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

export default class ProfileJobComponent extends React.Component{
  constructor(props){
      super(props);
      var full_name = props['full_name'];
      var job_positon_name =props['positon_name'];
      var avatar_pic_1 = props['avatar_pic_1'];
      var  number_jobs= props['number_jobs'];
      var profile_location = props['profile_location'];
  }

  render(){
    var settings = {
      dots: false,
      infitnite: true,
      centerMode: false,
      arrows: true,
      slidesToScroll: 3,
      slidesToShow: 3
    };
    return(
      <MuiThemeProvider>
        <Card>
          <CardHeader/>
          <CardMedia>
            <Slider {...settings} adaptiveHeight={true}>
              <div><img src="images/mastercard.png" height="50" width="50"/></div>
              <div><img src="images/americanexpress.png" height="50" width="50"/></div>
              <div><img src="images/discover.png" height="50" width="50"/></div>
              <div><img src="images/paypal.png" height="50" width="50"/></div>
              <div><img src="images/visa.png" height="50" width="50"/></div>
            </Slider>
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    )
  }
}
