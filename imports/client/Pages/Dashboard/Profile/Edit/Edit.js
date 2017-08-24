
import React from 'react';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ContractorEdit from './ContractorEdit';
import ProfessionalEdit from './ProfessionalEdit';

const EditPage =(props)=>{
  let isPro;
  if (props.user.roles[0] === "PRO") {
    return <ProfessionalEdit/>
  } else if (props.user.roles[0] === "CON"){
    return <ContractorEdit/>
  }

}
export default Edit = createContainer(({ params }) => {
    return {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
    };
}, EditPage);
