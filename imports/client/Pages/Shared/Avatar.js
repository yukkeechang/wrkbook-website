import React ,{Component} from 'react';



export default class Avatar extends Component{
    constructor(props){
        super(props);
        let width = this.props.size;
        let textsize = width * 0.75;
        width = width.toString() +'px';
        textsize = textsize.toString() +'px';
        this.state={
          width: width,
          textSize: textsize
        }
    }
    render(){

      let page = (
      <div onClick={this.props.onClick}style={{backgroundColor: '#eeeeee',height:this.state.width,width:this.state.width,cursor:'pointer',display:'flex', justifyContent:'center',alignItems:'center'}} className="circle">
        <h1 style={{fontSize:this.state.textSize,fontFamily: 'avenir-lt-w01_35-light1475496,sans-serif',color:'#595959'}}> {this.props.letter}</h1>
      </div>);
      if (this.props.srcLink){
         page = (

            <img style={{height:this.state.width,width:this.state.width,cursor:'pointer'}}  onClick={this.props.onClick} src={this.props.srcLink}alt="" className="circle" />
      
          );
      }
        return(

        page


        )
    }
}
