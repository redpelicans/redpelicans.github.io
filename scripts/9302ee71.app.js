'use strict';

var app = angular.module(
  'rpApp'
, [ 'ngCookies'
  , 'ngRoute'
  , 'ngAnimate'
  , 'pascalprecht.translate'
  , 'rpApp.controllers'
  , 'rpApp.directives'
  ]
);

app.config(function($routeProvider, $locationProvider, $translateProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
    })
    .when('/services/:stateId', {
      templateUrl: 'views/services.html'
    , controller: 'ServicesCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  // $locationProvider.html5Mode(true);

  $translateProvider
    .useStaticFilesLoader({ prefix: 'i18n/', suffix: '.json' })
    .preferredLanguage('en') // avoid FOUC
    .fallbackLanguage('en')
    .useCookieStorage();
});

'use strict';

var controllers = angular.module(
  'rpApp.controllers'
, [ 'ngTouch'
  ]
);

controllers.controller('HeaderCtrl', function($scope) {
  $scope.scroll = 0;
});

controllers.controller('SlideMenuCtrl', function($scope) {
  $scope.isActive = false;
  $scope.toggle = function() {
    $scope.isActive = !$scope.isActive;
  }
});

controllers.controller('ServicesCtrl', function($scope, $routeParams) {
  $scope.states = [
    'home'
  , 'angular'
  , 'd3'
  , 'node'
  , 'mongo'
  , 'consulting'
  ];
  $scope.state = $scope.states[0];
  $scope.changeState = function(index) {
    if (_.isNumber(index) && index < $scope.states.length) {
      $scope.state = $scope.states[index];
    } else {
      $scope.state = $scope.states[0];
    }
  }

  $scope.carousel = {};
  $scope.carousel.interval = -1;
  $scope.carousel.slides = $scope.states;
  // $scope.carousel.slides = _.map($scope.states, function(state) {
  //   return { template: state.template };
  // });

  // $scope.carousel.changeSlide = function(index) {
  //   if (_.isNumber(index) && index < $scope.carousel.slides.length) {
  //     $scope.carousel.slides[index].active = true;
  //   }
  // }

  // $scope.$watch(
  //   'state'
  // , function(newState) {
  //     if (newState && _.has(newState, 'index')) {
  //       $scope.carousel.changeSlide(newState.index);
  //     }
  //   }
  // , true);

  $scope.changeState(_.indexOf($scope.states, $routeParams.stateId));
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

directives.directive('rpLine', function() {
  return {
    restrict: 'E'
  , replace: true
  , scope: {}
  , transclude: true
  , templateUrl: 'views/line.html'
  , link: function($scope, element, $attrs) {
      $scope.overrides = $attrs.overrides;
    }
  };
});
