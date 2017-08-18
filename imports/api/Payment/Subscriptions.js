import Stripe from 'stripe';
import { Meteor } from 'meteor/meteor';
import {CONTRACTOR} from '../Schemas/employerSchema';
import { Roles } from 'meteor/alanning:roles';

const stripe = Stripe(Meteor.settings.private.stripe);

Meteor.methods({
  createSubscription(planId){
    if(Roles.userIsInRole(this.userId,CONTRACTOR)){
      let customerInfo = Meteor.users.findOne({_id:this.userId});

      let stripeSubscriptionCreateSync = Meteor.wrapAsync(stripe.subscriptions.create,
         stripe.subscriptions);
      try{
            let result = stripeSubscriptionCreateSync({
              customer: customerInfo.profile.customer,
              items :[
                {
                  plan: planId,
                }
              ]
            });

      }catch(error){
        console.log(error);
        throw new Meteor.Error('403',error);
      }

    }
  }
});
