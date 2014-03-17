'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', { templateUrl: 'app/views/main.html' })
    .otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode(true);
});
