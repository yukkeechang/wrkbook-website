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
