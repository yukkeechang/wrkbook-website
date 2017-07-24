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
