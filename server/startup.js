import { Meteor } from 'meteor/meteor';

import {ServerSession } from 'meteor/matteodem:server-session';

console.log("thingy-startup");
Meteor.startup(()=>{

  process.env.MAIL_URL = 'smtp://no-reply%40wrkbook.com:dg56fdghb354@smtp-relay.gmail.com:587/';
  if (process.env.METEOR_SETTINGS) {
    try {
      Meteor.settings = JSON.parse(process.env.METEOR_SETTINGS);
      console.log(Meteor.settings);
      console.log(process.env.METEOR_SETTINGS);
      console.log(Meteor.settings.private.stripe);
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
