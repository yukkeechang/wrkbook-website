<<<<<<< HEAD
import React from 'react';

import EmpUserInfo from './Components/EmpUserInfo';
import ProfileAbout from './Components/ProfileAbout';
import EmpJobsDone from './Components/EmpJobsDone';

export default class EmpProfile extends React.Component{
    render(){
        return(
            <div>
                <EmpUserInfo user={this.props.user}/>
                <ProfileAbout user={this.props.user}/>
                <EmpJobsDone user={this.props.user}/>
            </div>
        )
    }
}
=======
import React from 'react';

import EmpUserInfo from './Components/EmpUserInfo';
import ProfileAbout from './Components/ProfileAbout';
import EmpJobsDone from './Components/EmpJobsDone';

export default class EmpProfile extends React.Component{
    render(){
        return(
            <div>
                <EmpUserInfo/>
                <ProfileAbout/>
                <EmpJobsDone/>
            </div>
        )
    }
}
>>>>>>> 9989ff61143950d4be6a86f9cfd072954d048e53
