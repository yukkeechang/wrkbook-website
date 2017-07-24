export default RequirementSchema = new SimpleSchema({
  osha:{
    type: Boolean,
    defaultValue: false
  },
  driverLicense:{
    type: Boolean,
    defaultValue: false
  },
  backgroundCheck:{
    type: Boolean,
    defaultValue: false
  },
  highGed:{
    type: Boolean,
    defaultValue: false
  },
  languages:{
    type: [String],
    defaultValue: [],
  }

});
