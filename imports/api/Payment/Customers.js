import Stripe from 'stripe';
import { Meteor } from 'meteor/meteor';
import {CONTRACTOR} from '../Schemas/employerSchema';
import { Roles } from 'meteor/alanning:roles';

const stripe = Stripe(Meteor.settings.private.stripe);

Meteor.methods({
  createCustomer(){
    if(Roles.userIsInRole(this.userId,CONTRACTOR)){
      let newCustomer = Meteor.users.findOne({_id:this.userId});

      let stripeCustomerCreateSync = Meteor.wrapAsync(stripe.customers.create,
         stripe.customers);
      try{
            let result = stripeCustomerCreateSync({
              email: newCustomer.emails[0].address,
              description:'Testing Things'
            });
            newCustomer.profile.customer = result.id;
            Meteor.users.update({_id: this.userId},{$set: newCustomer});
      }catch(error){
        console.log(error);
        throw new Meteor.Error('403',error);
      }

    }
  }
});
