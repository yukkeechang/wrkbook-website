import React from 'react';
import { Link } from 'react-router-dom'
import RaisedButton  from 'material-ui/RaisedButton';
import FlatButton  from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProfileCardComponent from '../Components/avatarcard';
import ProfileJobComponent from '../Components/profilejob';
import ProfileCertificationComponent from '../Components/profilecertification';
import ProfilePaymentComponent from '../Components/profilepayment';
import ProfileReviewComponent from '../Components/profilereviewcard';
import ProfileAboutComponent from '../Components/profileaboutcard';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import ReactGridLayout from 'react-grid-layout';


export default class Profile extends React.Component{

    render(){

        return(

            <div style={{margin: '20px',}}>


            <ProfileCardComponent

             full_name = "John Smith "
            job_positon_name ="Painter"
             avatar_pic_1 ="images/handshake.png"
              number_jobs = "20"
             profile_location = "Location, NY"
            />
            <br/>



            <div>
              <div className="row">
                <div className="column">
                  <div>
                  <ProfileJobComponent/>
                  </div>
                </div>
                <br/>
                <div className="column">
                  <ProfileAboutComponent
                  profile_about ="Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet."
                  />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <ProfileCertificationComponent/>
                </div>
                <br/>
                <div className="column">
                  <ProfilePaymentComponent/>
                </div>
              </div>
            </div>




              <br/>
              <ProfileReviewComponent
                full_name = "Some Company"
                profile_review="orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."
                avatar_pic_1 = "images/handshake.png"
              />
              <br/>
              <ProfileReviewComponent
                full_name = "Some Company"
                profile_review="orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."
                avatar_pic_1 = "images/handshake.png"
              />
              <br/>
              <ProfileReviewComponent
                full_name = "Some Company"
                profile_review="orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."
                avatar_pic_1 = "images/handshake.png"
              />
              <br/>
              <ProfileReviewComponent
                full_name = "Some Company"
                profile_review="orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."
                avatar_pic_1 = "images/handshake.png"
              />
              <br/>
              <ProfileReviewComponent
                full_name = "Some Company"
                profile_review="orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."
                avatar_pic_1 = "images/handshake.png"
              />
              <br/>
              <ProfileReviewComponent
                full_name = "Some Company"
                profile_review="orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."
                avatar_pic_1 = "images/handshake.png"
              />
              </div>



        )
    }
}
