(function(w) {
  'use strict';
  var angular = w.angular;
  angular.module('Thoth')
    .constant('config', {

      apiBaseURL: 'http://localhost:8080/api', // Root API URL

      languages: {
        available: [
          'en',
          'fr'
        ],
        preferred: 'fr'
      },

      recordsPerPage: 15

    });
}(window));
