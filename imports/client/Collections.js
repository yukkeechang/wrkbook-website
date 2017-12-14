const imageStore = new FS.Store.GridFS('images');

//COPY THIS
 Images = new FS.Collection('images',{
  stores: [imageStore]
});

Job = new Mongo.Collection('jobs');
Review = new Mongo.Collection('reviews');
Event = new Mongo.Collection('events');
References = new Mongo.Collection('references');
Notification = new Mongo.Collection('notifications');
