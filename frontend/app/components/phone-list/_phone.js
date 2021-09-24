'use strict';

angular.module('app.phones', [
  ])
  .config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
        .state('phone-list', {
            url: '/phone-list',
            controller: 'PhoneCtrl',
            templateUrl: 'components/phone-list/phone.html'
        });
    }
  ]);
