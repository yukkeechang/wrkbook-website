import React from 'react';
import Rating from '../../Rating';
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

displayRating() {

    if(!isEmpty(this.props.reviews)){
      let reviewz = this.props.reviews;
      let avgRate =reviewz.map(function(review, index){
        return review;
        console.log(review)
      })
      var sum=0;
      for (i=0; i < avgRate.length; i++) {
        sum += avgRate[i].rating
      }
      let avg = sum/avgRate.length;
      return(
        <div className="container">
          <br/>
              <Rating
                rating={avg}
                starSize={20}
                textSize={15}
              />
        </div>
      );
    }
    else if(!this.props.loading){
      return (
        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
          <MSpinner />
        </div>
      );
    }
    else{
      return(
        <div>
          No Ratings
        </div>
      );
    }
  }


  render() {
    const {user} = this.props
    return (
      <div className="row">
        <div className="col s12">
          <div className="card-panel" style={{ paddingRight: 0 }}>
            <h4 className="user-name-text">{user.profile.firstName} {user.profile.lastName}</h4>
            {this.displayRating()}
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
  }
}

export default GeneralInfo = withTracker(params => {

  let reviews =[];
  let loading = false;
  let handle = Meteor.subscribe('reviews-for-you');
  loading = handle.ready();
  reviews = Review.find({}).fetch();
  // console.log("################1");
  // console.log(reviews);



  return {
    loading:loading,
    reviews:reviews
  };
})(GeneralInfoPage);
