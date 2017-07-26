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
