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

        //nextArrow= {<HardwareKeyboardArrowRight/>}
        //prevArrow= {<HardwareKeyboardArrowLeft/>}
    }




    render(){
      var settins = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        centerMode:false,
        arrows: true,

      };
        return(
          <MuiThemeProvider>
          <Card >

          <CardHeader

          />

            <CardMedia >

              <Slider {...settins}
                adaptiveHeight={true}
              >

              <div className="dummyJob"><img src="images/handshake.png" height="145" width="145"/></div>
              <div className="dummyJob"><img src="images/handshake.png" height="145" width="145"/></div>
              <div className="dummyJob"><img src="images/handshake.png" height="145" width="145"/></div>
              <div className="dummyJob"><img src="images/handshake.png" height="145" width="145"/></div>
              <div className="dummyJob"><img src="images/handshake.png" height="145" width="145"/></div>
              <div className="dummyJob"><img src="images/handshake.png" height="145" width="145"/></div>
              </Slider>


            </CardMedia>
          </Card>
        </MuiThemeProvider>

        )
    }
}
