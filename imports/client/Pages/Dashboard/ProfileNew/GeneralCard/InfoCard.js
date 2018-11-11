import React from "react";
import GeneralCard from './Components/DisplayCard';
import EditCard from './Components/EditCard';
export default class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      toggleEdit:false

    };
  }
  onToggle=(e)=>{
    this.setState({toggleEdit:!this.state.toggleEdit});
  }
  render() {
    let color = this.state.toggleEdit ? 'wrkbook-green-text':'black-text';
    return (
      <div className="card-panel z-depth-0">
        <div className="row">
          <div className=" col s2  offset-s10">
          <div onClick={this.onToggle} className="btn-flat">
             <i className={`material-icons ${color}`}>edit</i>
           </div>
          </div>
          {!this.state.toggleEdit ?
            <GeneralCard
            name={'John Grego'} jobTypes={'Painter'} location={'Brooklyn,New York'}
            phone={'917-667-1222'} email={'johngrego@gmail.com'}/> :
            <EditCard onButtonClick={this.props.onButtonClick} />
          }
        </div>
      </div>
    );
  }
}
