import React from 'react';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <h5>About</h5>
            <div className="row">
              <div className="col s12">
                <p>10 years of experience in the painting industry. Focuses include level 5 finishes and glazing. Graduated from Apex Painting School.</p>
              </div>
              <div className="col s12">
                <p>Languages Spoken: English, Spanish, Albanian</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
