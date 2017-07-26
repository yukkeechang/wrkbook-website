<<<<<<< HEAD
import React from 'react';

import ConUserInfo from './Components/ConUserInfo';
import ProfileAbout from './Components/ProfileAbout'

export default class ConProfile extends React.Component{
    render(){
        return(
          <div>
              <ConUserInfo user={this.props.user}/>
          </div>
        )
    }
}
=======
import React from 'react';

import ConUserInfo from './Components/ConUserInfo';
import ProfileAbout from './Components/ProfileAbout'

export default class ConProfile extends React.Component{
    render(){
        return(
          <div>
              <ConUserInfo/>
              <ProfileAbout/>
          </div>
        )
    }
}
>>>>>>> 9989ff61143950d4be6a86f9cfd072954d048e53
