const imageStore = new FS.Store.GridFS('images');
const pdfStore = new FS.Store.GridFS('pdfs');

Images = new FS.Collection('images',{
  stores: [imageStore]
});
PDFs = new FS.Collection('pdfs',{
  stores: [pdfStore]
});

Job = new Mongo.Collection('jobs');
Review = new Mongo.Collection('reviews');
Event = new Mongo.Collection('events');
Reference = new Mongo.Collection('references');
Notification = new Mongo.Collection('notifications');
