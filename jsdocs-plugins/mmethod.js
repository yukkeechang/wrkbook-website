/**
 * This module defines a custom jsDoc tag.
 * It allows you to document header parameters of a route.
 * @module jsdocs-plugins/publication
 */

'use strict';
exports.name ='mmethod';

exports.defineTags = function(dictionary) {
  dictionary.defineTag('mmethod',{
    mustHaveValue: false,
    canHaveType: false,
    canHaveName: false,
    onTagged: function(doclet, tag) {
      if(!doclet.publication){
        doclet.mmethod = [];
      }
      doclet.mmethod.push({
        scope: 'meteor method',
      });
    },

  });
};

exports.handlers = {

  newDoclet : function(e) {

    if (e.doclet.mmethod) {

      let publication = e.doclet.mmethod[0];
      e.doclet.scope = publication.scope;
    }
  }
};
