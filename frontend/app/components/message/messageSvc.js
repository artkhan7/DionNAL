'use strict';

angular.module('app.message')
  .service('MessageSvc', ['$resource', 'serverConfig',
    function($resource, serverConfig) {
      var apiUrl = serverConfig.baseURL + '/public' + '/messages';

      var actions = {
        query: {
          method: 'GET',
          url: apiUrl + '/find/:id/:offset',
          isArray: true
        },
        queryCount: {
          method: 'GET',
          url: apiUrl + '/count/:id',
          isArray: false
        },
      };

      var resource = $resource(apiUrl, {}, actions);

      return resource;
    }
  ]);
