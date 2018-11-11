import React from "react";
import AboutCardDisplay from "./Components/DisplayCard";
import EditCard from "./Components/EditCard";
export default class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleEdit: false
    };
  }
  onToggle = e => {
    this.setState({ toggleEdit: !this.state.toggleEdit });
  };
  render() {
    let color = this.state.toggleEdit ? "wrkbook-green-text" : "black-text";
    return (
      <div className="card-panel z-depth-0">
        <div className="row">
          <div className="col s2  offset-s10">
            <div onClick={this.onToggle} className="btn-flat">
              <i className={`material-icons ${color}`}>edit</i>
            </div>
          </div>
          {!this.state.toggleEdit ?
            <AboutCardDisplay
              education={"highschool dipolma, techincal school"}
              skills={"i can paint and things "}
              languages={"english,spanish,german"}
              bio={"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"}
            />
           :
            <EditCard onButtonClick={this.props.onButtonClick}/>
          }
        </div>
      </div>
    );
  }
}
