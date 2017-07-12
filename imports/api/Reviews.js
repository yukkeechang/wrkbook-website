import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

var schema = {
  _id: String,

  profileId: String,
  rating: Number,
  desc: String
};
