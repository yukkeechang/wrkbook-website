import React from "react";
import { Link } from "react-router-dom";
import MSpinner from "../../../Shared/MSpinner";
export default class Congrats extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      submitted: false,
      unhandleErr:false
    }
  }
  componentDidMount(){
      Meteor.call('createJob',this.props.job,(err)=>{
        if(err){
            console.log(err);
            this.setState({unhandleErr:true,submitted:true})
        }else{
          this.setState({submitted:true,unhandleErr:false})
        }
      });
  }
  render(){
    return (
      <div className="container">
        <div className="card">
          <div className="row card-content">
            {
              !this.state.submitted ?

              <div  className="flex-center" >
                  <MSpinner size={'150px'}/>
              </div>
              :
              this.state.unhandleErr ?
              <div>
                <h2 className="center-align card-title">
                  Opps. Something went wrong.
                </h2>
                <div className="row center-align">
                  <i style={{fontSize:'100px'}}className="red-text material-icons">error_outline</i>
                </div>

                <Link to="/" style={{lineHeight:'70px'}}className="col s6 offset-s3 center-align wrkbook-green lighten-1 roundish-button-flat-large larger-text">Go Home</Link>
              </div>
              :
              <div>
                <h2 className="center-align card-title">
                  Your Job has been successfully created
                </h2>
                <div className="row center-align">
                  <i style={{fontSize:'100px'}}className="teal-text material-icons">check_circle</i>
                </div>

                <Link to="/" style={{lineHeight:'70px'}}className="col s6 offset-s3 center-align notification-red-alert roundish-button-flat-large larger-text">Go Home</Link>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
