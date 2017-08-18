import Stripe from 'stripe';
import { Meteor } from 'meteor/meteor';
import {CONTRACTOR} from '../Schemas/employerSchema';
import { Roles } from 'meteor/alanning:roles';

const stripe = Stripe(Meteor.settings.private.stripe);

Meteor.methods({
  createCard(token){
    if(Roles.userIsInRole(this.userId,CONTRACTOR)){
      let customerInfo = Meteor.users.findOne({_id:this.userId});

      let stripeCardCreateSync = Meteor.wrapAsync(stripe.customers.createSource,
         stripe.customers);

      try{
            let result = stripeCardCreateSync(
              customerInfo.profile.customer,
              {
                source:token
            });

      }catch(error){
        console.log(error);
        throw new Meteor.Error('403',error);
      }

    }
  }
});
