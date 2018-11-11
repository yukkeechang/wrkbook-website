import React, {Component} from 'react';
import NewRef from './NewRef';
import EditRef from './EditRef';
import RefCard from  './RefCard.js';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import MSpinner from '../../Shared/MSpinner';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
class Refs extends Component{
    componentDidMount(){
      let page = ReactDOM.findDOMNode(this.refs.referencePage);
      $(page).ready(()=>{
        $('.modal').modal();
        $('.tooltipped').tooltip();
      });
    }
    componentWillUnmount(){
      $('#editref').tooltip('destroy');
    }
    openModal(){
      $('#addRefModal').modal('open');
    }
    render(){
        return(
            <div ref="referencePage" className="section">
              <div className="card-content">
                <div className="row">
                  <div className="col s10">
                    <h5 className="center-align">References</h5>
                  </div>
                  <div className="col s1">
                    <Link style={{padding:'0px'}} to={"/edit+references"}>
                      <a id="editref" style={{padding:'0px', fontSize:'30px', color:'black'}} className="waves-effect tooltipped"  data-position="right" data-tooltip="Edit references"><div style={{paddingRight:'7px', height:'40px',width:'40px'}} className="circle blue-grey center-align lighten-5"> <i className="material-icons">edit</i></div></a>
                    </Link>
                  </div>
                </div>
                <div className="divider"></div>
                {!this.props.ready ? <div className="row"><div className="col s4 offset-s4"style={{textAlign: 'center'}}></div></div> : this.props.myRefs.map((reference,index)=>{
                  return(
                    <RefCard key={reference._id} reference={reference}/>
                  )
                })}
                <div style={{display:'flex', justifyContent:'center'}}>
                  <a className="waves-effect waves-teal teal roundish-button-flat" onClick={this.openModal.bind(this)}>Add Reference</a>
                </div>
              </div>
              <div id="addRefModal" className="modal">
                <div className="modal-content">
                  <NewRef/>
                </div>
              </div>
            </div>
        )
    }
}
export default References = withTracker(params  => {
    let handle = Meteor.subscribe('your-references');
    let ready = handle.ready();
    return {
        ready: ready,
        myRefs: Reference.find({}).fetch()
    };
})(Refs);
