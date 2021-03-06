import stripeAPI from 'stripe';
import { Meteor } from 'meteor/meteor';
import {CONTRACTOR} from '../Schemas/employerSchema';
import { Roles } from 'meteor/alanning:roles';

const stripe = stripeAPI(Meteor.settings.private.stripe);
const NOTVERIFIED ={
  emailNotVerified : true
};
Meteor.methods({
  createCustomer(){
    if(Roles.userIsInRole(this.userId,CONTRACTOR)){
      let newCustomer = Meteor.users.findOne({_id:this.userId});
      if(!newCustomer.emails[0].verified)throw new Meteor.Error('403',NOTVERIFIED);
      let stripeCustomerCreateSync = Meteor.wrapAsync(stripe.customers.create,
         stripe.customers);
      try{
            let result = stripeCustomerCreateSync({
              email: newCustomer.emails[0].address,
              description:'Testing Things'
            });
            newCustomer.profile.customer = result.id;
            Meteor.users.update({_id: this.userId},{$set: newCustomer});
            Roles.addUsersToRoles(this.userId, 'subscribe' );
      }catch(error){
        throw new Meteor.Error('403',error);
      }

    }
  },
  getCustomer(){
    if(Roles.userIsInRole(this.userId,CONTRACTOR)){
      let customerInfo = Meteor.users.findOne({_id:this.userId});
      if(!customerInfo.profile.customer) throw new Meteor.Error('403','Not Customer');

      let stripeRetrieveCustomer = Meteor.wrapAsync(stripe.customers.retrieve,
      stripe.customers);
      try {
        let result = stripeRetrieveCustomer(
          customerInfo.profile.customer
        );
        return result;
      } catch (e) {
        throw new Meteor.Error('403',e);
      }
    }

  },
});
