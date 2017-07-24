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
