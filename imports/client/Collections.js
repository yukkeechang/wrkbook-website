const imageStore = new FS.Store.GridFS('images');
const thumbNail = new FS.Store.GridFS('thumbnail');
//COPY THIS
 Images = new FS.Collection('images',{
  stores: [imageStore,thumbNail]
});

Job = new Mongo.Collection('jobs');
Review = new Mongo.Collection('reviews');
Event = new Mongo.Collection('events');
References = new Mongo.Collection('references');
Notification = new Mongo.Collection('notifications');
Review  = new Mongo.Collection('reviews');
