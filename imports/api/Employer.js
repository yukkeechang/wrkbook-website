import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

var schema = {
  _id: String,
  companyName: String,
  licenseNumber: String,
  webPage: Object,
  location: Object,
  details: String,
  image: String,
  profileId: String
};

Employer = new Mongo.Collection('Employers')

Meteor.publish('employer-data', function publishfunct(userid){
  this.ready();
  return Employee.find({profileId: userId});
});

Meteor.methods({
  createEmployer(employer){
    if(!this.userId) throw new Meteor.Error('401',"Login required")
    check(employer,_.omit(schema,'_id'));
    if( !(Employer.findOne({profileId: employer.profileId}) == null) ){
      throw new Meteor.Error('403','Account already exists');
    }
    Employer.insert(employer, function(err,ress){
      if(err){
        throw new Meteor.Error('BADBAD', 'Could not insert Employee');
      }else if ( ress) {


      }
    });
  },
  removeEmployer(employerId){
    if(!this.userId) throw new Meteor.Error('401',"Login required")
    check(employerId,String);
    Employer.remove({_id: employerId});

  },
  updateEmployer(employerId){
    if(!this.userId) throw new Meteor.Error('401',"Login required")
    check(employerId,String);
    //DO LATER



  },
  getEmployerbyId(empolyerId){
    if(!this.userId) throw new Meteor.Error('401',"Login required")
    check(employerId,String);
    Employer.find({_id: employerId}).fetch();

  }
  getEmployerbyUserID(userid){
    if(!this.userId) throw new Meteor.Error('401',"Login required")
    check(employerId,String);
    Employer.find({profileId: userid}).fetch();
  }
});
