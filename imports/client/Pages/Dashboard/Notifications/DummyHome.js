import React from 'react';
import { Meteor } from 'meteor/meteor';
import NotificationCard from './PageComponents/SingleNotification';
import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../Shared/MSpinner';
class Home extends React.Component {
  constructor(props) {
    super(props);


  }
  componentDidMount(){
    // console.log(this.props);

  }
  componentWillUnmount(){
    this.props.handle.stop();
  }
  render(){

      return(
        <div>
        <div className="row">
            <div className="container">
            <h1 className="center-align">Notifications</h1>
            <div className="divider"/>
          </div>
        </div>
        {!this.props.ready ? <div className="row"><div className="col s4 offset-s4"style={{textAlign: 'center'}}><MSpinner /></div></div> :
          <div>
            {
              this.props.notifications.length>0 ?
              this.props.notifications.map((notification,index)=>{
                return(
                  <div className="container" style={{padding:'15px'}} key={notification._id}>
                    <NotificationCard notification={notification}/>
                    <div className="divider"/>
                  </div>
                )
            }):
            <h1 className="center-align">No Notifications</h1>
            }
          </div>
        }
        </div>
      )
  }

}
export default NotficationsHome = withTracker(({params})  => {
    let handle = Meteor.subscribe('all-notifications-for-user');
    let ready = handle.ready();

    return {
        ready: ready,
        handle:handle,
        notifications: Notification.find({}).fetch()
    };
})(Home);
