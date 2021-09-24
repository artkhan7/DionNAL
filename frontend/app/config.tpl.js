'use strict';

(function (angular) {
  var config = {
    dev: {
      baseURL: 'http://localhost:3000'
    },
    prod: {
      baseURL: 'http://localhost:3000'
    }
  };

  angular.module('app.serverConfig', []).constant('serverConfig', config.__XX__);
})(angular);
