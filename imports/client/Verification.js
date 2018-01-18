import {Session} from 'meteor/session';
Accounts.onEmailVerificationLink(function (token, done) {
  Accounts.verifyEmail(token, function (error) {
    if (error) {
      console.log(error);
    }else{
      Meteor.call('createCustomer',(err)=>{
        if(err){

          console.log(err);
        }
      });
    }
    done();

  });
});
Accounts.onResetPasswordLink(function(token,done){
  Session.set('token',token);
  done();

});
