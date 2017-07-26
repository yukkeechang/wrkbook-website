<<<<<<< HEAD
import React from 'react';
import Slider from 'react-slick';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class EmpJobsDone extends React.Component{
    constructor(props){
        super(props);
        var full_name = props['full_name'];
        var job_positon_name =props['positon_name'];
        var avatar_pic_1 = props['avatar_pic_1'];
        var number_jobs= props['number_jobs'];
        var profile_location = props['profile_location'];
    }
    render(){
        var settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            centerMode:false,
            arrows: true,
        };
        return(
            <MuiThemeProvider>
                <Card>
                    <CardHeader title={<h3>Jobs Completed</h3>}/>
                    <CardMedia>
                        <Slider {...settings} adaptiveHeight={true}>
                            <div className="dummyJob"><h3>No job completed</h3></div>
                            <div className="dummyJob"><h3>No job completed</h3></div>
                            <div className="dummyJob"><h3>No job completed</h3></div>
                            <div className="dummyJob"><h3>No job completed</h3></div>
                            <div className="dummyJob"><h3>No job completed</h3></div>
                            <div className="dummyJob"><h3>No job completed</h3></div>
                        </Slider>
                    </CardMedia>
                </Card>
            </MuiThemeProvider>
        )
    }
}
=======
import React from 'react';
import Slider from 'react-slick';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class EmpJobsDone extends React.Component{
    constructor(props){
        super(props);
        var full_name = props['full_name'];
        var job_positon_name =props['positon_name'];
        var avatar_pic_1 = props['avatar_pic_1'];
        var number_jobs= props['number_jobs'];
        var profile_location = props['profile_location'];
    }
    render(){
        var settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            centerMode:false,
            arrows: true,
        };
        return(
            <MuiThemeProvider>
                <Card>
                    <CardMedia>
                        <Slider {...settings} adaptiveHeight={true}>
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
>>>>>>> 9989ff61143950d4be6a86f9cfd072954d048e53
