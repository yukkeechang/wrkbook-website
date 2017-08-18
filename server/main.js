import { Meteor } from 'meteor/meteor';
import '../imports/api/Users';
import '../imports/api/Jobs';
import '../imports/api/Images';
import '../imports/api/Events';
import '../imports/api/Payment/Customers';
import '../imports/api/Payment/Cards';
import '../imports/api/Payment/Subscriptions';

Meteor.startup(()=>{

  process.env.MAIL_URL = 'smtp://EMAIL@DOMAIN:PASSWORDFOREMAIL@smtp.SERVER.com:PORT/';
});
