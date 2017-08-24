import React from 'react';

export default class HourRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let filledInBoxes = this.props.filledInBoxes;
    let startingTimes = this.props.startingTimes;
    let titles = this.props.titles;

    return (
      <div className="row" style={this.props.style.zeroMarginPadding} key={this.props.time}>
        <div className="col s1 left-align" style={this.props.style.hourDiv}>
          {this.props.time}
        </div>
        <div className="col s11" style={this.props.style.combinedRow}>
          <div className="row" style={this.props.style.rowDiv}>
            <div
              className="col s4"
              style = {
                filledInBoxes[0] == 1
                ?
                  startingTimes[0] == this.props.militaryTime
                  ?
                    this.props.style.filledInRowBorderTop
                    :
                    this.props.style.filledInRow
                :
                  this.props.style.solidBlackBorder
              }
            >
            {
              startingTimes[0] == this.props.militaryTime
              ?
                titles[0]
              :
                null
            }
            </div>
            <div
              className="col s4"
              style = {
                filledInBoxes[1] == 1
                ?
                  startingTimes[1] == this.props.militaryTime
                  ?
                    this.props.style.filledInRowBorderTop
                    :
                    this.props.style.filledInRow
                :
                  this.props.style.solidBlackBorder
              }
            >
            {
              startingTimes[1] == this.props.militaryTime
              ?
                titles[1]
              :
                null
            }
            </div>
            <div
              className="col s4"
              style = {
                filledInBoxes[2] == 1
                ?
                  startingTimes[2] == this.props.militaryTime
                  ?
                    this.props.style.filledInRowBorderTop
                    :
                    this.props.style.filledInRow
                :
                  this.props.style.solidBlackBorder
              }
            >
            {
              startingTimes[2] == this.props.militaryTime
              ?
                titles[2]
              :
                null
            }
            </div>
          </div>
          <div className="row" style={this.props.style.rowDiv}>
            <div
              className="col s4"
              style = {
                filledInBoxes[0] == 1
                ?
                  startingTimes[0] == this.props.militaryTime
                  ?
                    this.props.style.filledInRow
                    :
                    this.props.style.filledInRow
                :
                  this.props.style.dottedGrayBorder
              }
            >
            </div>
            <div
              className="col s4"
              style = {
                filledInBoxes[1] == 1
                ?
                  startingTimes[1] == this.props.militaryTime
                  ?
                    this.props.style.filledInRow
                    :
                    this.props.style.filledInRow
                :
                  this.props.style.dottedGrayBorder
              }
            >
            </div>
            <div
              className="col s4"
              style = {
                filledInBoxes[2] == 1
                ?
                  startingTimes[2] == this.props.militaryTime
                  ?
                    this.props.style.filledInRow
                    :
                    this.props.style.filledInRow
                :
                  this.props.style.dottedGrayBorder
              }
            >
            </div>
          </div>
        </div>
      </div>
    )
  }
}
