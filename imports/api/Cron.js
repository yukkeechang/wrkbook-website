import { SyncedCron } from 'meteor/percolate:synced-cron';
import {changeIsOpen} from './Jobs';

SyncedCron.config({log: false,utc:true});

SyncedCron.add({
  name: "Setting the open date to false",
  schedule(parser){
    return parser.text('every 24 hours');
  },
  job(){
    let num = changeIsOpen();
    return `${num} jobs closed`;
  },

});
SyncedCron.start();
