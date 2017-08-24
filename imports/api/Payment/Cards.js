import Stripe from 'stripe';
import { Meteor } from 'meteor/meteor';
import {CONTRACTOR} from '../Schemas/employerSchema';
import { Roles } from 'meteor/alanning:roles';
import { NOTCUST} from './Subscriptions'
const stripe = Stripe(Meteor.settings.private.stripe);


function getCard(cardId,customerId){
    let stripeCardRetrieve = Meteor.wrapAsync(stripe.customers.retrieveCard,
      stripe.customers);
    try {
      let result = stripeCardRetrieve(
        customerId,
        cardId
      );
      console.log(result);
    } catch (e) {
      console.log(e);
      throw new Meteor.Error('403',e);
    }
}

Meteor.methods({
  createCard(token){
    if(Roles.userIsInRole(this.userId,CONTRACTOR)){
      let customerInfo = Meteor.users.findOne({_id:this.userId});
      if(!customerInfo.profile.customer) throw new Meteor.Error('403',NOTCUST);
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
  },
  updateCard(cardId,updateField){
    if(Roles.userIsInRole(this.userId,CONTRACTOR)){
      let customerInfo = Meteor.users.findOne({_id:this.userId});
      if(!customerInfo.profile.customer) throw new Meteor.Error('403',NOTCUST);
      let stripeCardEdit = Meteor.wrapAsync(stripe.customers.updateCard,
      stripe.customers);

      try {
        let result = stripeCardEdit(
          customer.profile.customer,
          cardId,
          updateField);
      } catch (e) {
        console.log(e);
        throw new Meteor.Error('403',e);
      }
    }
  },
  removeCard(cardId){
    if(Roles.userIsInRole(this.userId,CONTRACTOR)){
      let customerInfo = Meteor.users.findOne({_id:this.userId});
      if(!customerInfo.profile.customer) throw new Meteor.Error('403',NOTCUST);
      let stripeCardRemove = Meteor.wrapAsync(stripe.customers.deleteCard,
      stripe.customers);
      try {
        let result = stripeCardRemove(
          customerInfo.profile.customer,
          cardId
        );
      } catch (e) {

      }
    }
  },
  getStoredPayments(){
    if(Roles.userIsInRole(this.userId,CONTRACTOR)){
      let customerInfo = Meteor.users.findOne({_id:this.userId});
      if(!customerInfo.profile.customer) throw new Meteor.Error('403',NOTCUST);
      let customerObject = Meteor.call('getCustomer');
      let paymentArray = customerObject.sources.data;
      return paymentArray;


    }
  },
  getSingleCard(cardId){
    if (Roles.userIsInRole(this.userId,CONTRACTOR)) {
      let customerInfo = Meteor.users.findOne({_id:this.userId});
      if(!customerInfo.profile.customer) throw new Meteor.Error('403',NOTCUST);
      let stripeCardRetrieve = Meteor.wrapAsync(stripe.customers.retrieveCard,
      stripe.customers);

      try {
        let result = stripeCardRetrieve(
          customerInfo.profile.customer,
          cardId
        );
        return result;
      } catch (e) {

      }

    }

  },
  getAllCards(){
    
  }
});
