import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import ReferenceSchema  from './Schemas/referenceSchema';
import  BasicText  from './Schemas/basicTextSchema';
import {DEFAULT} from './Schemas/basicTextSchema';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';
import {NOTAUTH} from './Users'
import { Roles } from 'meteor/alanning:roles';

/** @module Reference */

/**
 * @summary Defines the Reference collection
 * The References Collection has data about who was the previous employer
 * has the basic MongoBD functions(insert,update,remove,etc)
 *
 */
Reference = new Mongo.Collection('references');
Reference.attachSchema(ReferenceSchema);
if ( Meteor.isServer ) {
  /**
   * Pushes all References objects that belong to the currently logged on user.
   * @param {void} nothing should passed in
   * @return {cursor} points the references objects on minimongo
   * @throws {Meteor.Error} will not push any data to client if the currently loggen in user is not an Professional
   * @example Meteor.subscribe('your-references')
   *
   */
  Meteor.publish('your-references',function(){
    if(Roles.userIsInRole(this.userId,PROFESSIONAL)){

       return Reference.find({owner: this.userId}, {sort: {updateAt: -1}});
    }else{
      this.stop();
      return ;
    }
  });

  Meteor.publish('references-for-user', function(id){
    if(Roles.userIsInRole(id,PROFESSIONAL)){
      //console.log("user is pro!")
       return Reference.find({owner: id}, {sort: {updateAt: -1}});
    }else{
    //console.log("STOP----")
      this.stop();
      return ;
    }
  });
}

Meteor.methods({
  /**
   * Validates the references object against the ReferenceSchema
   * @param  {Reference} refObject the reference object to be stored in the database
   * @throws {Meteor.Error} If the object being validated violates the ReferenceSchema
   */
  validateReference(refObject){
    let validateReference  = ReferenceSchema.namedContext('REF');
    let basicValidation = BasicText.namedContext('basic1');
    let nameErr = !basicValidation.validate(refObject.name,{keys:['text']});
    let posErr = !basicValidation.validate(refObject.position,{keys:['text']});
    let compErr = !basicValidation.validate(refObject.companyName,{keys:['text']});
    let emailErr = !validateReference.validate(refObject,{keys:['email']});
    let phoneErr = !validateReference.validate(refObject,{keys:['phone']});

    let Errors = {
      nameErr   : nameErr,
      posErr    :posErr,
      compErr   :compErr,
      emailErr  :emailErr,
      phoneErr  :phoneErr
    };

    if(nameErr ||posErr  ||compErr ||emailErr ||phoneErr)throw new Meteor.Error('403',Errors);
  },
  /**
   * Will Insert a refObject into the database, but first validates the object
   * against the ReferenceSchema. Th function will overwrite the following fields
   * 'owner','createdAt','updateAt' to the id of the user calling the function,
   * and new Date objects respectivaly
   * @param  {ReferenceObject} refObject the reference object to be stored
   * @throws {Meteor.Error} '403' If the refObject violates the ReferenceSchema
   * or if the user is not logged in or the user is not a PROFESSIONAL or a CONTRACTOR
   */
  createReference(refObject){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
    if(!isPRO && !isCON) throw new Meteor.Error('401',NOTAUTH);
    Meteor.call('validateReference',refObject);
    refObject.owner = this.userId;
    refObject.createdAt = new Date();
    refObject.updateAt = new Date();
    Reference.insert(refObject);

  },
  /**
   * Will Update a Reference with an the id,refId. The Will be updated based upon
   * the refObject. The refObject being will be validated against the ReferenceSchema.
   * @param  {string} refId    the id of the Reference to be updated
   * @param  {Object} refObject the object that contains updated data
   * @throws {Meteor.Error} '403' If the refObject violates the ReferenceSchema
   * or '401' if the user is not logged in or the user is not a PROFESSIONAL or a CONTRACTOR
   */
  updateReference(refId,refObject){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
    if(!isPRO && !isCON) throw new Meteor.Error('401',NOTAUTH);
    Meteor.call('validateReference',refObject);
    refObject.updateAt = new Date();
    Reference.update({_id:refId,owner:this.userId},{$set: refObject});
  },
  /**
   * Will delete the reference object the specific id, refId.
   * @param  {string} refId the id of the ReferenceObject
   * @throws {Meteor.Error} '401' If the user is not logged in or
   * the user is not a PROFESSIONAL or a CONTRACTOR
   */
  deleteReference(refId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
    if(!isPRO && !isCON) throw new Meteor.Error('401',NOTAUTH);
    Reference.remove({_id:refId,owner:this.userId})

  },
  /**
   * Will return a refObject with the assiocated id,refId
   * @param  {string} refId the id of the Reference
   * @return {Object|NULL}   If there exist an reference with the assiocated id
   * that object will be return otherwise it will return NULL
   * @throws {Meteor.Error} '401' If the user is not logged in or
   * the user is not a PROFESSIONAL or a CONTRACTOR
   */
  getReference(refId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
    if(!isPRO && !isCON) throw new Meteor.Error('401',NOTAUTH);
    return Reference.findOne({_id: refId});
  }

});
