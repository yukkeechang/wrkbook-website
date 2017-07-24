import React from 'react';

import EmpProfile from './Profile/EmpProfile';
import ConProfile from './Profile/ConProfile';
import Home from '../../Pages/Home';

export default class Prof extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            if(this.props.user){
                let page = this.props.user.profile.isPro ? <EmpProfile/> : <ConProfile/>;
                return(page);
            }
            else{
                return(
                    <Home/>
                );
            }
        )
    }
}
export default Profile = createContainer(({ params }) => {
    return {
        user: Meteor.user(),
    };
}, Prof);
