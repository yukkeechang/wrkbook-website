import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import MTextField from '../../Shared/MTextField';
import Rating from 'react-rating';

export default class CreateReview extends Component {
  constructor(props) {
      super(props);
      this.state = {
          rating: 0,
          hasRated: false
      }
  }

  // Callback after rating the employer. rate is the star value out of 5 stars
  handleRate(rate) {
    this.setState({
      hasRated: true,
      rating: rate,
    });
  }

  componentDidMount(){
      Materialize.updateTextFields();
  }
  
  render() {
      return (
        <div className="card">
            <div className="card-content">
                <div className="row">
                    <span className="col s10 card-title">
                        Thank you for using WrkBook!
                    </span>
                    <span className="col s10 card-title">
                        Please take a second to review (Companies Name) to help other professionals like yourself
                    </span>
                </div>
                <form>
                    <div className="row">
                        <div className="col s12 m6">
                        <p>Please select the categories that describe (Contractors name)</p>
                          <p>
                            <input type="checkbox" className="filled-in" id="paid-on-time"/>
                            <label htmlFor="filled-in-box">Paid on time</label>
                          </p>

                          <p>
                            <input type="checkbox" className="filled-in" id="clean"/>
                            <label htmlFor="filled-in-box">Clean</label>
                          </p>
                        <p>
                          <input type="checkbox" className="filled-in" id="safe-workspace"/>
                          <label htmlFor="filled-in-box">Safe workspace</label>
                        </p>
                        <p>
                          <input type="checkbox" className="filled-in" id="recommended"/>
                          <label htmlFor="filled-in-box">Recommended</label>
                        </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m6">
                        <p>Please rate (Company Name)</p>
                        <Rating
                          initialRate={this.state.rating}
                          empty={<i className="material-icons" style={{"fontSize": "40px", color: "#26a69a"}}>star_border</i>}
                          full={<i className="material-icons" style={{"fontSize": "40px", color: "#26a69a"}}>star</i>}
                          fractions={2}
                          onChange={this.handleRate.bind(this)}
                        />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s18 m8">
                            <MTextField ref="position" id="position"  label="Anything else we should know?" />
                        </div>
                    </div>
                    <input type="submit" className="btn blue-grey " data-html="true" value="Submit" />
                </form>
            </div>
        </div>
    )
  }
}
