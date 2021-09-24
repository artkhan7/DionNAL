'use strict';

angular.module('app', [
    //Libs
    'ui.router',
    'pascalprecht.translate',
    'ngResource',

    'app.navigation',
    'app.about',
    'app.home',
    'app.phones',
    'app.message',
    'app.serverConfig'
  ])

  .config([
    '$locationProvider',
    '$urlRouterProvider',
    '$translateProvider',
    function ($locationProvider, $urlRouterProvider, $translateProvider) {
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
      $urlRouterProvider.otherwise('/home');

      $translateProvider.preferredLanguage('en');
      $translateProvider.useSanitizeValueStrategy(null);
      $translateProvider.useStaticFilesLoader({
        prefix: 'translation/',
        suffix: '.json'
      });
    }
  ]);
