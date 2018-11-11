import React ,{Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import MSpinner from './MSpinner';

 class Ava extends Component{
    constructor(props){
        super(props);
        let width = this.props.size;
        let textsize = Math.round(width * 0.75);
        width = width.toString() +'px';
        textsize = textsize.toString() +'px';
        this.state={
          width: width,
          textSize: textsize
        }

    }
    render(){
      if (!this.props.ready) {
        return(
          <MSpinner size={this.props.width}/>
        )

      }else if (!!this.props.letter) {
        return(
          <div className="circle flex-center" style={{lineHight:this.state.width ,width: this.state.width, height: this.state.width, backgroundColor:'#f5f5f5'}}>
              <h1 className="center-text" style={{color:'#bdbdbd',fontSize:this.state.textSize}}>{this.props.letter.toUpperCase()}</h1>
          </div>
        )
      }
      else{
        return(
        <div style={{width:'100%',height:'100%',margin:'0px'}}>
                <img className="circle" style={{width: this.state.width, height: this.state.width}} src={this.props.link} alt=""/>
        </div>
        );
      }

    }
}


export default Avatar =  withTracker(props=>{
  const handle = Meteor.subscribe('images-id',props.imageId);
  const ready = handle.ready();
  things = Images.find({}).fetch()
  return {
      ready : handle.ready(),
      link : "/cfs/files/images/" + props.imageId
  };
})(Ava);
