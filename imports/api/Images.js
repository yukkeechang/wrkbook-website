
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';
import {NOTAUTH} from './Users'
import {ServerSession } from 'meteor/matteodem:server-session';
/** @module Images */
const imageStore = new FS.Store.GridFS('images');
const pdfStore = new FS.Store.GridFS('pdfs');
/**
  * @summary Defines the Images collection,
  * has the basic MongoBD functions(insert,update,remove,etc)
  */
Images = new FS.Collection('images',{
  stores: [imageStore]
});
/**
  * @summary Defines the PDFs collection,
  * has the basic MongoBD functions(insert,update,remove,etc)
  */
PDFs = new FS.Collection('pdfs',{
  stores: [pdfStore]
});

Images.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

Images.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});



PDFs.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});
PDFs.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });


 /**
 *
 * @summary Publishes all images stored on the database
 * @publication {Images} images User
 * @function
 * @todo add validations
 * @name images
 * @returns {MongoBD.cursor|NULL} cursor point to all valid images objects.
 *
 */
 Meteor.publish('images', function(){
  return Images.find({});
 });
 /**
 *
 * @summary Publishes  images with a specific id
 * @publication {Images} images-id User
 * @function
 * @todo add validations
 * @param {String} imageId id of image to be publish to client
 * @name images-id
 * @returns {MongoBD.cursor|NULL} cursor point to  valid image object.
 *
 */
Meteor.publish('images-id',function(imageId){
  return Images.find({_id: imageId});
});
/**
* @summary Publishes  images within the specified array of ids
* @publication {Images} cert-images User
* @function
* @todo add validations
* @param {Array} arrayofId array containing all ids of images to be publish to client
* @name images
* @returns {MongoBD.cursor|NULL} cursor point to all valid images objects.
*
*/
Meteor.publish('cert-images',function(arrayofId){

  return Images.find({_id: {$in : arrayofId} });
});
/**
* @summary Publishes  pdfs  within the specified array of ids
* @publication {PDFs} cert-pdfs User
* @function
* @todo add validations
* @param {Array} arrayofId array containing all ids of images to be publish to client
* @name images
* @returns {MongoBD.cursor|NULL} cursor point to all valid images objects.
*
*/
Meteor.publish('cert-pdfs',function(arrayofId){

  return PDFs.find({_id: {$in : arrayofId} });
});

Meteor.methods({
  /**
   * [updateImage description]
   * @param  {String} imageId [description]
   * throws {Meteor.Error}
   */
  updateImage(imageId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    check(imageId,String);

    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
    let prevUser = Meteor.users.findOne({_id: this.userId});
    let defaultImage = ServerSession.get('DEFAULTPIC');
    if (isPRO){

      let oldImageId =prevUser.profile.employeeData.image;

      prevUser.profile.employeeData.image = imageId;

      Meteor.users.update({_id: this.userId},{$set: prevUser});
      if(!(oldImageId === defaultImage))Images.remove({_id:oldImageId});

    }
    else if (isCON){
      let oldImageId =prevUser.profile.employerData.image;

      prevUser.profile.employerData.image = imageId;
      Meteor.users.update({_id: this.userId},{$set: prevUser});
      if(!(oldImageId === defaultImage))Images.remove({_id:oldImageId});
    }else{
      throw new Meteor.Error('401','NOT AUTHORIZED');
    }
  },
  /**
   * [uploadCertificate description]
   * @param  {String} imageId [description]
   * @throws {Meteor.Error}
   */
  uploadCertificate(imageId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    check(imageId,String);
    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    if (!isPRO) throw new Meteor.Error('401',NOTAUTH);
    let prevUser = Meteor.users.findOne({_id: this.userId});
    let length = prevUser.profile.employeeData.certfi.length;
    prevUser.profile.employeeData.certfi[length] = imageId;

    Meteor.users.update({_id: this.userId},{$set: prevUser});

  },
});
