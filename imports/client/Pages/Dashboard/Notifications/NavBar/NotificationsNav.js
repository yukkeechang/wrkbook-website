import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import NotificationCard from './Components/NotificationCard';
import MSpinner from '../../../Shared/MSpinner';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
class Notis extends Component{

    componentWillUnmount(){
      //this.prop.handle.stop();
    }
    render(){
      let onlyTwo = this.props.notifications.slice(0,2);
        return(
            <div>
              {
                !this.props.ready ? <div className="row"><div className="col s4 offset-s4"style={{textAlign: 'center'}}><MSpinner /></div></div> :

                  <ul style={{marginTop:'0px',marginBottom:'0px'}} className="collection">
                    {onlyTwo.length >0 ?
                      onlyTwo.map((notification,index)=>{

                    return(

                       <li key={notification._id} className="collection-item">
                          <Link to={notification.href}>
                           <NotificationCard notification={notification}/>
                         </Link>
                      </li>

                    )
                    })
                    :

                    null


                  }
                  </ul>

              }
            </div>
        )
    }
}
export default NavBarNotfications = withTracker(({params})  => {
    let handle = Meteor.subscribe('notifications-for-user');
    let ready = handle.ready();
    return {
        ready: ready,
        handle:handle,
        notifications: Notification.find({seen:false}).fetch()
    };
})(Notis);
