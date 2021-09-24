'use strict';

angular.module('app.phones')
  .service('PhoneSvc', ['$resource', 'serverConfig',
    function($resource, serverConfig) {
      var apiUrl = serverConfig.baseURL + '/public' + '/phones';

      var actions = {
        query: {
          method: 'GET',
          url: apiUrl,
          isArray: true
        }
      };

      var resource = $resource(apiUrl, {}, actions);

      return resource;
    }
  ]);
