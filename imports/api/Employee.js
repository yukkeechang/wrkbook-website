import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

var schema = {
  _id: String,
  jobTitle: String,
  education: String,
  certifications: Array,
  languages: Array,
  osha: Boolean,
  skills: Array,
  details: String,
  image: String,
  profileId: String,
  reviewIds: Array
};

Employee = new Mongo.Collection('Employees');


Meteor.publish('employee-data', function publishfunct(userid){
  this.ready();
  return Employee.find({profileId: userid});
});

Meteor.methods({
  createEmployee(employee){
    if(!this.userId) throw new Meteor.Error('401',"Login required")
    check(employee,_.omit(schema,'_id'));
    if( !(Employee.findOne({profileId: employee.profileId}) == null) ){
      throw new Meteor.Error('403','Account already exists');
    }
    Employee.insert(employee, function(err,ress){
      if(err){
        throw new Meteor.Error('BADBAD', 'Could not insert Employee');
      }else if ( ress) {


      }
    });
  },
  removeEmployee(employeeId){
    if(!this.userId) throw new Meteor.Error('401',"Login required")
    check(employeeId,String);
    Employee.remove({_id: employeeId});
  },
  updateEmployee(employeeId){
    if(!this.userId) throw new Meteor.Error('401',"Login required")
    check(employeeId,String);
  },
  findEmployeesbySkills(skills){

  },
  findEmployeebyID(employeID){
    if(!this.userId) throw new Meteor.Error('401',"Login required")
    check(employeID,String);
    return Employee.find({_id: employeID}).fetch();
  },
  getEmployeebyUserID(userid){
    if(!this.userId) throw new Meteor.Error('401',"Login required")
    check(userid,String);
     return Employee.find({profileId: userid}).fetch();
  }

});
