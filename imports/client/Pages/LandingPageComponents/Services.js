import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Shared/Header';
export default Services = ()=> {
    return (
        <div style={{paddingLeft: '35px', paddingRight: '35px', backgroundColor: 'white'}}>
            <div >
                <div>
                    <h6 style={{fontStyle:'bold',fontSize:'30px', fontColor: 'gray', paddingBottom: '20px', paddingTop: '20px'}} className="center-align">Jobs and Services</h6>
                      <div className="row">
                       <div >
                        <div className="col s4 m1 l1"><Step img="images/services/plumb.png" text="Plumbing"/></div>
                        <div className="col s4 m1 l1"><Step img="images/services/digger.png" text="Demolition"/></div>
                        <div className="col s4 m1 l1"><Step img="images/services/paint_brush.png" text="Painting"/></div>
                        <div className="col s4 m1 l1"><Step img="images/services/plug.png" text="Electrician"/></div>
                        <div className="col s4 m1 l1"><Step img="images/services/mechanic.png" text="Mechanic"/></div>
                        <div className="col s4 m1 l1"><Step img="images/services/workman.png" text="General  Labor"/></div>
                        <div className="col s4 m1 l1"><Step img="images/services/wheel_barrow.png" text="Concrete"/></div>
                        <div className="col s4 m1 l1"><Step img="images/services/roofing.png" text="Masonry"/></div>
                        <div className="col s4 m1 l1"><Step img="images/services/paint_roller.png" text="Glazing"/></div>
                        <div className="col s4 m1 l1"><Step img="images/services/roofing.png" text="Carpentry"/></div>
                        <div className="col s4 m1 l1"><Step img="images/services/house.png" text="Remodeling"/></div>
                        <div className="col s4 m1 l1"><Step img="images/services/house.png" text="HVAC"/></div>
                        </div>
                      </div>
                </div>
            </div>
         <div className="divider"></div>
         <div className="section"/>
        </div>
    )
}
