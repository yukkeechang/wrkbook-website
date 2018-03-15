import { Meteor } from 'meteor/meteor';

import {ServerSession } from 'meteor/matteodem:server-session';


Meteor.startup(()=>{


  
  if (process.env.METEOR_SETTINGS) {
    try {
      Meteor.settings = JSON.parse(process.env.METEOR_SETTINGS);

    } catch (e) {
      throw new Error("METEOR_SETTINGS are not valid JSON: " + process.env.METEOR_SETTINGS);
    }
  }else{
    console.log("THERE IS NO SETTINGS");
  }

  let isImage = Images.findOne({'original.name': 'ic_account_circle_black_48dp_2x.png' });

  if(!isImage){
    let thingd = Images.insert('../web.browser/app/images/ic_account_circle_black_48dp_2x.png');


    ServerSession.set('DEFAULTPIC',thingd._id);
  }else {
    ServerSession.set('DEFAULTPIC',isImage._id);
  }

  console.log("Finish With Images");


});
