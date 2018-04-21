import { Meteor } from 'meteor/meteor';;
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect, be } from 'meteor/practicalmeteor:chai';

describe('dummy test',function(){
  it('something that should be tested',function(){
    let things = 3;
    expect(things).to.equal(3);
  });
});
