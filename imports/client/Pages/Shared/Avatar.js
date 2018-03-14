import React ,{Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

 class Ava extends Component{
    constructor(props){
        super(props);
        let width = this.props.size;
        let textsize = width * 0.70;
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
          <h1>loading</h1>
        )

      }else if (!this.props.imageId) {
        return(
          <div className="circle valign-wrapper center-align" style={{display:'flex',flexDirection:'column',justifyContent:'center',width: this.state.width, height: this.state.width, backgroundColor:'#f5f5f5'}}>
              <h1 style={{color:'#bdbdbd',paddingTop:'30px',fontSize:this.state.textSize}}>{this.props.letter.toUpperCase()}</h1>
          </div>
        )
      }
      else{
        return(
        <div>
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
