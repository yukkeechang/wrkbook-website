import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import MessageCard from './Components/MessageCard';
import MSpinner from '../../../Shared/MSpinner';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
class Notis extends Component{
    lol(e){
      console.log(e);
    }
    componentWillUnmount(){
      //this.prop.handle.stop();
    }
    render(){
      let onlyTwo = this.props.messages.slice(0,2);
        return(
            <div>
              {
                !this.props.ready ? <div className="row"><div className="col s4 offset-s4"style={{textAlign: 'center'}}><MSpinner /></div></div> :

                  <ul style={{marginTop:'0px',marginBottom:'0px'}} className="collection">
                    {onlyTwo.length >0 ?
                      onlyTwo.map((message,index)=>{

                    return(

                       <li key={message._id} className="collection-item">
                          <Link onClick={this.lol.bind(this,message)} to={'/'}>
                           <MessageCard message={message}/>
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
export default NavBarMessages = withTracker(({params})  => {
    let handle = Meteor.subscribe('unread-messages');
    let ready = handle.ready();
    return {
        ready: ready,
        handle:handle,
        messages: Message.find({seen:false}).fetch()
    };
})(Notis);
