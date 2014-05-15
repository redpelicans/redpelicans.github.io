'use strict';

var app = angular.module(
  'rpApp'
, [ 'ngCookies', 'ngRoute'
  , 'pascalprecht.translate'
  , 'rpApp.controllers'
  , 'rpApp.directives'
  ]
);

app.config(function($routeProvider, $locationProvider, $translateProvider) {
  $routeProvider
    .when('/', { templateUrl: 'views/main.html' })
    .otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode(true);

  $translateProvider
    .useStaticFilesLoader({ prefix: 'i18n/', suffix: '.json' })
    .preferredLanguage('en') // avoid FOUC
    .fallbackLanguage('en')
    .useCookieStorage();
});

'use strict';

var controllers = angular.module('rpApp.controllers', []);

controllers.controller('HeaderCtrl', function($scope) {
  $scope.scroll = 0;
});

controllers.controller('SlideMenuCtrl', function($scope) {
  $scope.isActive = false;
  $scope.toggle = function() {
    $scope.isActive = !$scope.isActive;
  }
});

'use strict';

var directives = angular.module('rpApp.directives', []);

directives.directive('scrollPosition', function($window) {
  return {
    scope: {
      scroll: '=scrollPosition'
    }
  , link: function($scope, element, $attrs) {
      var window = angular.element($window)
        , handler = function() { $scope.scroll = window.scrollTop(); };
      
      window.on('scroll', $scope.$apply.bind($scope, handler));
      handler();
    }
  };
});
