'use strict';

angular.module('app.message', [
  ])
  .config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
        .state('message', {
            url: '/message/:id',
            controller: 'MessageCtrl',
            templateUrl: 'components/message/message.html'
        });
    }
  ]);
