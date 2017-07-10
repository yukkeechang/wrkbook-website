import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

var schema = {
  _id: String,
  jobTitle: String,
  education: String,
  certifications: Object,
  languages: Object,
  osha: Boolean,
  skills: Object,
  details: String,
  image: String,
  profileId: String,
  reviewIds: Object
};

Employee = new Mongo.Collection('Employees');

Meteor.methods({
  createEmployee(employee){
    if(!this.userId) throw new Meteor.Error('401',"Login required")
    check(employee,_.omit(schema,'_id'));
    Employee.insert(employee, function(err,ress){
      if(err){
        throw new Meteor.Error('BADBAD', 'Could not insert Employee');
      }else if ( ress) {
        Meteor.publish('employee-data', function publishfunct(userid){
          console.log(ress);
          this.ready();
          return Employee.find({profileId: userid});
        });

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
