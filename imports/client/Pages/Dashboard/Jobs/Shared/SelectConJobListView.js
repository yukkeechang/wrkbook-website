import React from "react";

import ListingView from "./ConJobListingView";
export default class SelectConJobList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }
  handleChangeIndex(index) {
    this.setState({ index: index });
  }
  render() {
    return (
      <ListingView
        job={this.props.job}
        isCompeleted={this.props.isCompeleted}
        isUpcoming={this.props.isUpcoming}
        employeeIds={this.props.job.admitAsIDs[this.state.index].ids}
        handleChangeIndex={this.handleChangeIndex.bind(this)}
      />
    );
  }
}
