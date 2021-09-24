'use strict';

angular.module('app.home', [
  ])
  .config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
        .state('/', {
            url: '/home',
            controller: 'HomeCtrl',
            templateUrl: 'components/home/home.html'
        });
    }
  ]);
