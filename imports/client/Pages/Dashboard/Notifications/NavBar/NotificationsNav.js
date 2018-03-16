import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import NotificationCard from './Components/NotificationCard';
import MSpinner from '../../../Shared/MSpinner';
import { withTracker } from 'meteor/react-meteor-data';
class Notis extends Component{
    lol(e){
      console.log(e);
    }
    render(){
      let onlyThree = this.props.notifications.slice(0,3);
        return(
            <div>
              {
                !this.props.ready ? <div className="row"><div className="col s4 offset-s4"style={{textAlign: 'center'}}><MSpinner /></div></div> :

                  <ul className="collection">
                    {onlyThree.map((notification,index)=>{

                    return(
                       <li  onClick={this.lol.bind(this,notification._id)} key={notification._id} className="collection-item">
                          <NotificationCard notification={notification}/>
                      </li>

                    )
                    })}
                  </ul>

              }
            </div>
        )
    }
}
export default NavBarNotfications = withTracker(params  => {
    let handle = Meteor.subscribe('notifications-for-user');
    let ready = handle.ready();
    return {
        ready: ready,
        notifications: Notification.find({}).fetch()
    };
})(Notis);
