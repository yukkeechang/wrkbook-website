import React from 'react';


export default class DisplayMessage extends React.Component {
  constructor(props) {
    super(props);


  }

  render(){

      return(

          <div style={{marginBottom:'1px'}}className="row">
            <div className="col s12">
            {
              this.props.message.to === this.props.currentUserID ?
              <span style={{borderRadius:'20px',paddingTop:'10px',paddingRight:'15px',paddingLeft:'15px'}} className="right indigo lighten-4">
                {this.props.message.message}
              </span>
              :
              <span  style={{borderRadius:'20px',padding:'15px',paddingRight:'15px',paddingLeft:'10px'}} className="left cyan lighten-4">
                  {this.props.message.message}
              </span>
            }
          </div>
          </div>

      )
  }

}
