/**
 * This module defines a custom jsDoc tag.
 * It allows you to document header parameters of a route.
 * @module jsdocs-plugins/publication
 */

'use strict';
console.log("PUBLICATION");
exports.name ='publication';

exports.defineTags = function(dictionary) {
  dictionary.defineTag('publication',{
    mustHaveValue: true,
    canHaveType: true,
    canHaveName: true,
    onTagged: function(doclet, tag) {
      if(!doclet.publication){
        doclet.publication = [];
      }
      doclet.publication.push({
        name: tag.value.name ? tag.value.name: '',
        type: tag.value.type ? (tag.value.type.names.length === 1 ? tag.value.type.names[0] : tag.value.type.names) : '',
        scope: 'publication',
        description: tag.value.description ?  tag.value.description: ''
      });
    },

  });
};

exports.handlers = {

  newDoclet : function(e) {

    if (e.doclet.publication) {

      let publication = e.doclet.publication[0];
      e.doclet.scope = publication.scope;
    }
  }
};
