import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Shared/Header';
import Step from './HowTo/Step';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6



const imageText = [{ img: "/images/services/plumb.png",text: "Plumbing"},
                    {img:"/images/services/workman.png",text:"General Labor"},
                   {img:"/images/services/digger.png",text:"Demolition"},
                   {img:"/images/services/paint_brush.png",text:"Painting"},
                   {img:"/images/services/plug.png",text:"Electrician"},
                   {img: "/images/services/paint_roller.png",text: "Glazing"},
                   {img:"/images/services/wheel_barrow.png",text:"Concrete"},
                   {img: "/images/services/mechanic.png",text: "Mechanic"},
                   {img:"/images/services/roofing.png",text:"Masonry"},
                   {img:"/images/services/carpentry.png",text:"Carpentry"},
                   {img:"/images/services/house.png",text:"Remodeling"},
                   {img:"/images/services/HVAC.png",text:"HVAC"}

]
export default class Services extends React.Component{
  constructor(props){
    super(props);
    items = imageText.slice(0,6).map(i=>{
          return i;
    });

    this.state={
      count:0,
      interval: {},
      items: items
    }
  }
  componentDidMount(){
    let interval = setInterval(this.changeIcons,3500)
    this.setState({interval})
  }
  changeIcons=()=>{
    let count = this.state.count;
    if(count >= 6){
      count = 0;
    }else{
      count = count + 6;
    }
    items = imageText.slice(count,count+6).map(i=>{
          return i;
    });
    this.setState({count,items});
  }
  componentWillUnmount(){
    clearInterval(this.state.interval)
  }

  render(){
    const items = this.state.items.map((item,i) =>{
      return(
        <div style={{padding:'0px',margin:'0px'}}className="col s6 m2  center-align" key={item.text}>
          <Step img={item.img} text={item.text}/>
        </div>
      );
    })
    return(
        <div style={{ backgroundColor: 'white'}}>
            <div >
                <div>
                    <h6 style={{fontStyle:'bold',fontSize:'30px', fontColor: 'gray', paddingBottom: '20px', paddingTop: '20px'}} className="center-align">Find jobs in or skilled trade professionals in</h6>
                  
                      <div className="row">

                      <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={500}
                        transitionLeave={false}
                        transitionLeaveTimeout={300}>
                          {items}
                        </ReactCSSTransitionGroup>



                      </div>
                </div>
            </div>
         <div className="divider"></div>
         <div className="section"></div>

        </div>
    )
  }
}
