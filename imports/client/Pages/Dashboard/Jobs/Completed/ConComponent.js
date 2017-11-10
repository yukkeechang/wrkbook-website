import React from 'react';


export default class ConComponent extends React.Component {
//MAKE A CARD SHELL
  constructor(props) {
    super(props);

  }

  //Get date from event details here
  componentDidMount(){

  }

  cardHeader() {
    return (
      <div className="row">
        <div className="center-align">
        <div className="col s10 push-s1 card grey lighten-1">
          <div className="card-content white-text">
          <span className="card-title center-align">{this.props.title}</span>
          </div>
          </div>
        </div>
     </div>
    )
  }

  cardLabel() {
    return (
        <div className="row center-align">
          <div className="col s10">
            <h4 className="col m4 l4">Professional</h4>
            <h4 className="col m4 l4">Details</h4>
            <h4 className="col m4 l4">Rating and Reviews</h4>
          </div>
        </div>
    )
  }

  render() {
    console.log(this.props.testing)
    return(
      <div>
      <h1 className="center-align">Completed Jobs</h1>
        <div className="container">
          <div className="card">

          {this.cardHeader()}
          {this.cardLabel()}
          </div>
        </div>
      </div>

    )
  }

}
