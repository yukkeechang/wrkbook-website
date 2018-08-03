import React, {Component} from 'react';
import Button from '../../Shared/Button';
import ReactDOM from 'react-dom';
export default class Banner extends Component{
    constructor(props) {
      super(props)
    }
    onclicky =()=>{
      this.props.handleClick("collectEmails");
    }
    componentDidMount(){
      let things = ReactDOM.findDOMNode(this.refs.second);

      const observer = lozad(things);
      observer.observe();
    }
    render(){
      return(
        <div className="ban-small lozad" ref="second" data-background-image="/images/banner2.jpg">

           <div style={{marginBottom:'0px',paddingTop:'20px'}} className="row container">
             <h4 style={{textAlign:'justify',textAlignLast:'center'}} className="header white-text">
             “Was the quickest way to find painting job! Would definitely recommend.”
             <br/>
             <br/>
             — Carlos R.
             </h4>
           </div>
           <div className="row container">
             <Button onClick={this.onclicky} to="/#collectEmails" style={{margin:'20px'}} className="roundish-button-flat-large wrkbook-green col s12 m6 l6 offset-l3 offset-m3 " text={"white"}  >Find Work</Button>
           </div>
       </div>
      )
  }
}
