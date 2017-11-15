import { Meteor } from 'meteor/meteor';
import '../imports/api/Users';
import '../imports/api/Jobs';
import '../imports/api/References';
import '../imports/api/Images';
import '../imports/api/Notifications';
import '../imports/api/Events';
import '../imports/api/Reviews';
import '../imports/api/Payment/index';
import '../imports/api/Emails/Email';
import {ServerSession } from 'meteor/matteodem:server-session';

Meteor.startup(()=>{

  process.env.MAIL_URL = 'smtp://no-reply%40wrkbook.com:dg56fdghb354@smtp-relay.gmail.com:587/';
  
  if (process.env.METEOR_SETTINGS) {
    try {
      Meteor.settings = JSON.parse(process.env.METEOR_SETTINGS);
    } catch (e) {
      throw new Error("METEOR_SETTINGS are not valid JSON: " + process.env.METEOR_SETTINGS);
    }
  }
  let isImage = Images.findOne({'original.name': 'ic_account_circle_black_48dp_2x.png' });

  if(!isImage){
    let thingd = Images.insert('../web.browser/app/images/ic_account_circle_black_48dp_2x.png');


    ServerSession.set('DEFAULTPIC',thingd._id);
  }else {
    ServerSession.set('DEFAULTPIC',isImage._id);
  }


});
