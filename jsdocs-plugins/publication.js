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
        name: tag.value.name,
        type: tag.value.type ? (tag.value.type.names.length === 1 ? tag.value.type.names[0] : tag.value.type.names) : '',
        scope: tag.title,
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
      e.doclet.type = publication.type;
      e.doclet.name = publication.name;
      e.doclet.description = `<h5>Publication:</h5>
                              <table class="params">
                              <thead><tr><th>Collection</th><th>Name </th><th class="last">Authorized to Use</th></tr></thead>
                              <tr>
                              <td class="type">${e.doclet.type}</td>
                              <td class="name">${e.doclet.name}</td>
                              <td class="name last">${publication.description}</td>
                              </tr>
                              </table>
                              `;
    }
  }
};
