import { SyncedCron } from 'meteor/percolate:synced-cron';
import {changeIsOpen} from './Jobs';
/** @module Cron */
SyncedCron.config({log: true,utc:true});
/**
 * [name description]
 * @type {String}
 */
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
