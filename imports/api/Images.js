
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';
import {NOTAUTH} from './Users'
// FS.debug = true;

// let createThumb = function(fileObj, readStream, writeStream) {
//   // Transform the image into a 50x50px thumbnail
//   gm(readStream, fileObj.name()).resize('50', '50').stream().pipe(writeStream);
// };
// let createProfilePic = function(fileObj, readStream, writeStream) {
//   // Transform the image into a 350x350px thumbnail
//   gm(readStream, fileObj.name()).resize('350', '350').stream().pipe(writeStream);
// };
// FS.debug = true;
const imageStore = new FS.Store.GridFS('images');

Images = new FS.Collection('images',{
  stores: [imageStore]
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
//publish all images from the database the limit is 20
Meteor.publish('images', function(){
  return Images.find({});
 });
 //publish a image with the specific id
Meteor.publish('images-id',function(imageId){
  return Images.find({_id: imageId});
});
Meteor.publish('cert-images',function(arrayofId){
  return Images.find({_id: {$in : arrayofId} });
});
Meteor.methods({
  updateImage(imageId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    check(imageId,String);
    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
    if (isPRO){
    let prevUser = Meteor.users.findOne({_id: this.userId});
    // Images.remove({_id: prevUser.profile.employeeData.image});
    prevUser.profile.employeeData.image = imageId;
    Meteor.users.update({_id: this.userId},{$set: prevUser});
    }
    else if (isCON){
      let prevUser = Meteor.users.findOne({_id: this.userId});
      prevUser.profile.employerData.image = imageId;
      // Images.remove({_id: prevUser.profile.employerData.image});
      Meteor.users.update({_id: this.userId},{$set: prevUser});
    }else{
      throw new Meteor.Error('401','NOT AUTHORIZED');
    }
  }
});
