import { Meteor } from 'meteor/meteor';
import '../imports/api/Users';
import '../imports/api/Jobs';
import '../imports/api/Images';
import '../imports/api/Events';
import '../imports/api/Payment/index';
import '../imports/api/Emails/Email';

Meteor.startup(()=>{

  process.env.MAIL_URL = 'smtp://no-reply%40wrkbook.com:dg56fdghb354@smtp-relay.gmail.com:587/';

});
