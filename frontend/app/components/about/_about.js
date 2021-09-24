'use strict';

angular.module('app.about', [
  ])
  .config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
        .state('about', {
            url: '/about',
            templateUrl: 'components/about/about.html'
        });
    }
  ]);
