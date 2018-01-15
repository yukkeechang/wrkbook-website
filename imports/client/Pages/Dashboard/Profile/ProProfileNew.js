import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import ProHeader from './ProHeader';
import InfoCard from './InfoCard';
import About from './About';
import Contact from './Contact';
import Certificates from './Certificates';
import ReviewsCurrent from './ReviewsForCurrent';
import ReactDOM from 'react-dom';

export default class ProFile extends React.Component {
constructor(props) {
  super(props);
  this.state={
    about:true,
    contact:false,
    cert:false,
    reviews:false,
  }


}
handleClick=(e)=>{
  this.clearState();

  if(e==="about")this.setState({about:true});
  if(e==="contact")this.setState({contact:true});
  if(e==="cert")this.setState({cert:true});
    if(e==="reviews")this.setState({reviews:true});

}
componentDidMount(){

}
clearState=()=>{
  this.setState({
    about:false,
    contact:false,
    cert:false,
    reviews:false,
  })
}

render() {
  // console.log(this.state.upcoming);
    //
  return (
    <div>
      <ProHeader pageRender={this.state} tellParent={this.handleClick}/>
      <div className="container">
        <div className="row">
          <div className="col m4 s12">
            <InfoCard name={"HHHH"}
            subTopic={'dasfa'}
            location={"HHHHHH"}
            />
          </div>
          <div className="col m8 s12">
            {this.state.about&&
              <About  aboutText={"ert"}
                  skillsText={"dfgdsgdsfgdf"}
                  languages={['dgsdfgd','dfgdfgfdgdf']}
                  highGED={true}
                  higherEDU={true}
                  isPro={true}
                  tradeSchool={true}
                  tradeSchoolName={"sdgdsfgfds"} />
                }
                {
                  this.state.contact &&
                  <Contact

                    phoneNumber={"71888888"}
                    email={"hah@ha.com"}/>
                }
                {
                  this.state.cert&&
                  <Certificates
                    isUser={true}
                    user={Meteor.user()}
                    />

                }{
                  this.state.reviews &&
                  <ReviewsCurrent/>

                }
          </div>
        </div>
      </div>
    </div>

  )
 }
}
