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
                <p>Been running Sanchez Painting Corp for 20 years.</p>
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
