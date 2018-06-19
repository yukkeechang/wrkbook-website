import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect, be , assert } from 'meteor/practicalmeteor:chai';
import JobSchema  from './Schemas/jobSchema';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import {PublicationCollector} from 'meteor/johanbrook:publication-collector';
import './Jobs';

export function inserJob(jobObject){
  return Job.insert(jobObject);
}

if ( Meteor.isServer ) {



}
