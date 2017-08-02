
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

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

Meteor.publish('images', function(){
  return Images.find();
 });
Meteor.publish('images-id',function(imageId){
  return Images.find({_id: imageId});
})
