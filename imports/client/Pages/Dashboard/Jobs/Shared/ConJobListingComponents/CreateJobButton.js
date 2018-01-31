import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


export default class JobButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {


    }

  }

  componentDidMount(){
    let select = ReactDOM.findDOMNode();
    $(select).ready(()=>{
        $('.tooltipped').tooltip({delay: 50});
    });



  }
  componentWillUnmount(){
     $('.tooltipped').tooltip('remove');
  }

  render(){
    return(
      <div>
        <Link to={"/createjob"}>
          <a style={{ position: 'fixed',bottom: '30px',right: '30px'}} className="tooltipped btn-floating btn-large waves-effect waves-light teal" data-position="left" data-delay="50" data-tooltip="Create a Job"><i className="material-icons">add</i></a>
        </Link>
      </div>
    )
  }
}
