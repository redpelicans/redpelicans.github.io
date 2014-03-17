'use strict';

var app = angular.module('app', ['ngRoute', 'pascalprecht.translate']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', { templateUrl: 'app/views/main.html' })
    .otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode(true);

  $translateProvider
    .useStaticFilesLoader({ prefix: 'i18n/', suffix: '.json' })
    .preferredLanguage('en') // avoid FOUC
    .fallbackLanguage('en')
    .useCookieStorage();
});
