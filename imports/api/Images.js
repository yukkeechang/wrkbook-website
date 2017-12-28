
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
//FS.debug = true;

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
  return Images.find();
 });
 //publish a image with the specific id
Meteor.publish('images-id',function(imageId){
  return Images.find({_id: imageId});
});
Meteor.publish('cert-images',function(arrayofId){
  return Images.find({_id: {$in : arrayofId} });
});
