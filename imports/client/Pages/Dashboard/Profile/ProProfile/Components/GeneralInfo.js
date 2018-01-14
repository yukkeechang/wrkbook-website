import React from 'react';
import Rating from './Rating';
import { withTracker } from 'meteor/react-meteor-data';

function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}

class GeneralInfoPage extends React.Component {

  constructor(props) {
    super(props);

    const {isPro, user} = this.props
    if(isPro) {
      this.state = {
        jobTitle: user.profile.employeeData.jobTitle
      }
    } else {
      this.state = {
        companyName: user.profile.employerData.companyName.text
      }
   }
}

  render() {
    const {user} = this.props;
    if(!isEmpty(this.props.reviews)){
      let reviewz = this.props.reviews;
      let sum = reviewz.reduce(function(a, b) { return a + b; });
      let avg = sum / reviewz.length;
        return (
          <div className="row">
            <div className="col s12">
              <div className="card-panel" style={{ paddingRight: 0 }}>
                <h4 className="user-name-text">{user.profile.firstName} {user.profile.lastName}</h4>
                <div className="container">
                  <br/>
                      <Rating
                        rating={avg}
                        starSize={20}
                        textSize={15}
                      />
                </div>

                <div>
                {this.props.isPro ? this.state.jobTitle
                  .map(i => <span>{i}</span>)
                  .reduce((prev, curr) => [prev, ',  ', curr]) : null
                }
                </div>
                <p>{this.state.companyName}</p>
                <p className="gray-text" ></p>
              </div>
            </div>
          </div>
        )
    }else if(!this.props.loading){
      return (
        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
          <MSpinner />
        </div>
      );
    }else{
          return(
            <div>
              No Ratings
            </div>
          );
    }
  }
}

export default GeneralInfo = withTracker(params => {

  let reviews =[];
  let loading = false;
  let handle = Meteor.subscribe('reviews-for-you');
  loading = handle.ready();
  reviews = Review.find({}).fetch();


  return {
    loading:loading,
    reviews:reviews
  };
})(GeneralInfoPage);
