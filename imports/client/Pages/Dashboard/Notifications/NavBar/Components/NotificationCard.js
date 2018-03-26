import React from 'react';
import Avatar from '../../../../Shared/Avatar'

export default class NotificationCard extends React.Component {
  constructor(props) {
    super(props);


  }
  componentDidMount(){
    // console.log(this.props);

  }
  render(){

      return(
          <div style={{width:'450px'}}>
          <div  style={{margin:'0px'}} className="row">

              <div style={{height: '100%'}} className="col s3 ">

                  <Avatar size={80} letter={'A'}/>

              </div>
            <div className="col s8">

                  {
                    this.props.notification.typeNotifi == "MATCH" ?
                      <h5>New Job Match!</h5>
                      :
                      (this.props.notification.typeNotifi == "APPLIED" ?
                          <h5>New Hires!</h5>
                          :
                          (this.props.notification.typeNotifi == "HIRED" ?
                              <h5>Your're Hired!</h5>
                            :
                            (this.props.notification.typeNotifi == "REMOVE" ?
                              <h5>Job Deleted</h5>
                              :
                              null
                            )
                          )
                      )
                  }
                  <h6 className="truncate">{this.props.notification.description}</h6>



            </div>
            <div style={{height:'70px'}} className="col s1 valign-wrapper">
              {!this.props.notification.seen ?
                (this.props.notification.typeNotifi == "MATCH" ?
                  <div style={{width:'15px',height:'15px',borderRadius:'50%',background:'#ffa726'}}></div>
                  :
                  (this.props.notification.typeNotifi == "APPLIED" ?
                      <div style={{width:'15px',height:'15px',borderRadius:'50%',background:'#29b6f6'}}></div>
                      :
                      (this.props.notification.typeNotifi == "HIRED" ?
                        <div style={{width:'15px',height:'15px',borderRadius:'50%',background:'#9ccc65'}}></div>
                        :
                        (this.props.notification.typeNotifi == "REMOVE" ?
                          <div style={{width:'15px',height:'15px',borderRadius:'50%',background:'#ef5350 '}}></div>
                          :
                          null
                        )
                      )
                  )
                )
                :
                null
              }

            </div>

          </div>
        </div>



      )
  }

}
