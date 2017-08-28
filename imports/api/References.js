import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import ReferenceSchema  from './Schemas/referenceSchema';
import {DEFAULT} from './Schemas/basicTextSchema';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';
import {NOTAUTH} from './Users'
import { Roles } from 'meteor/alanning:roles';

Reference = new Mongo.Collection('references');
Reference.attachSchema(ReferenceSchema);

/**


*/
Meteor.publish('your-references',function(){
  if(Roles.userIsInRole(this.userId,PROFESSIONAL)){
    return Reference.find({owner: this.userId});
  }else{
    this.stop();
    return ;
  }
});

Meteor.methods({
  validateReference(refObject){
    let validateReference  = ReferenceSchema.newContext('REF');
    let nameErr = !validateReference.validateOne(refObject,'name.text');
    let posErr = !validateReference.validateOne(refObject,'position.text');
    let compErr = !validateReference.validateOne(refObject,'companyName.text');
    let locName = !validateReference.validateOne(refObject,'location.locationName');
    let locLat = !validateReference.validateOne(refObject,'location.locationName');
    let locLng = !validateReference.validateOne(refObject,'location.locationName');
    let emailErr = !validateReference.validateOne(refObject,'email');
    let phoneErr = !validateReference.validateOne(refObject,'phone');

    let Errors = {
      nameErr   : nameErr,
      posErr    :posErr,
      compErr   :compErr,
      locName   :locName,
      locLat    :locLat,
      locLng    :locLng,
      emailErr  :emailErr,
      phoneErr  :phoneErr
    };

    if(nameErr ||posErr  ||compErr || locName
        ||locLat  ||locLng  ||emailErr ||phoneErr)throw new Meteor.Error('403',Errors);
  },
  createReference(refObject){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
    // check(updateJob.,JobSchema);
    if(!isPRO && !isCON) throw new Meteor.Error('401',NOTAUTH);
    Meteor.call('validateReference',refObject);
    refObject.owner = this.userId;
    refObject.createdAt = new Date();
    refObject.updateAt = new Date();
    Reference.insert(refObject);

  },
  updateReference(refId,refObject){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
    // check(updateJob.,JobSchema);
    if(!isPRO && !isCON) throw new Meteor.Error('401',NOTAUTH);
    Meteor.call('validateReference',refObject);
    refObject.updateAt = new Date();
    Reference.update({_id:refId,owner:this.userId},{$set: refObject});
  },
  deleteReference(refId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
    // check(updateJob.,JobSchema);
    if(!isPRO && !isCON) throw new Meteor.Error('401',NOTAUTH);
    Reference.remove({_id:refId,owner:this.userId})

  },
  getReference(refId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
    // check(updateJob.,JobSchema);
    if(!isPRO && !isCON) throw new Meteor.Error('401',NOTAUTH);

    return Reference.findOne({_id: refId});
  }

});
