import React from 'react';

export default class JobDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div style={{ height: 300, width: 300 }}>
        <div className="right-align" style={{ height: 20, backgroundColor: "blue" }}>
          X
        </div>
        <h4>Check pick up at Tom's office</h4>
        <p>Date: 7/14/17 - 7/18/17</p>
        <p>Time: 9:30 AM - 10:30 AM</p>
        <h5>Event Description:</h5>
        <p>Pick up 3 checks for 3 paint jobs done from 2 months ago</p>
      </div>
    )
  }
}
