import React from "react";
import Avatar from '../../Shared/Avatar';
import AboutCard from "./AboutCard/AboutCard";
import InfoCard from "./GeneralCard/InfoCard";
import ReviewForCurrent from "./ReviewCard/ReviewsForCurrent";
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changed:false
    };
  }
  toggleOnChange=()=>{
    this.setState({
      changed:true
    })
  }
  handleSubmit = ()=>{
    if(this.state.changed){
      alert('submitting shit');

      this.setState({changed:false});
    }
  }
  componentWillUnmount(){
    if(this.state.changed){
      alert("Shit Not Saved");
      console.log("hhchgchg");
    }
  }
  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div style={{position:'relative',padding:'10px'}}className="row grey lighten-1">
          <div className="col m4">
            <Avatar letter="A" size={200}/>
          </div>
          <div className="col m8">
            <div onClick={this.handleSubmit} style={{position:'absolute',right:'10',bottom:'10'}} className="teal waves-effect darken-1  roundish-button-flat">
                Publish Profile
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4">
            <InfoCard onButtonClick={this.toggleOnChange}/>
          </div>

          <div className="col s12 m8">
            <AboutCard onButtonClick={this.toggleOnChange} />
            <ReviewForCurrent userId={Meteor.userId()} isPro={true}/>
          </div>
        </div>
      </div>
    );
  }
}
