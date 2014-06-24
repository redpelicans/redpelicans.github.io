'use strict';

var app = angular.module(
  'rpApp'
, [ 'ngCookies'
  , 'ngRoute'
  , 'ngAnimate'
  , 'pascalprecht.translate'
  , 'duScroll'
  , 'headroom'
  , 'nvd3ChartDirectives'
  , 'rpApp.services'
  , 'rpApp.controllers'
  , 'rpApp.directives'
  ]
);

app.config(function($routeProvider, $locationProvider, $translateProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
    , controller: 'HomeCtrl'
    })
    .when('/technologies/:id?', {
      templateUrl: 'views/technologies.html'
    , controller: 'TechnologiesCtrl'
    })
    .when('/logo', {
      templateUrl: 'views/logo.html'
    , controller: 'LogoCtrl'
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

app.value('duScrollEasing', function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 });

app.constant('moment', moment);

app.run(function($rootScope, $location) {
  $rootScope.$on('duScrollspy:becameActive', function($event, $element) {
    // todo
  });
});

'use strict';

var services = angular.module(
  'rpApp.services'
, []
);

services.service("MenuSrvc", function() {
  var that = this;
  that.items = [
    { name: 'home', icon: 'home', url: '/' }
  , { name: 'technologies', icon: 'briefcase', url: '/#/technologies' }
  , { name: 'stories', icon: 'book', url: '/#/stories' }
  , { name: 'lab', icon: 'cog', url: '/#/lab' }
  ];
  that.current;
  that.select = function(name) {
    that.current = _.find(that.items, function(item) {
      return item.name == name;
    });
  }
});

'use strict';

var controllers = angular.module(
  'rpApp.controllers'
, []
);

controllers.controller('AppCtrl', function($scope, $routeParams, $document, $location, $anchorScroll, $timeout) {
  $scope.$on('$viewContentLoaded', function() {
    $document.scrollTop(0, 0);
    if ($routeParams.id) {
      $timeout(function() {
        $document.scrollToElement(angular.element(document.getElementById($routeParams.id)), 120, 2000);
      }, 1000);
    }
  });
});

controllers.controller('MenuCtrl', function($scope, MenuSrvc) {
  $scope.menu = {};

  $scope.menu.items = MenuSrvc.items;
  $scope.menu.current = {};
  $scope.menu.isActive = false;
  $scope.menu.change = function(item) {
    MenuSrvc.current = item;
    $scope.menu.toggle();
  }
  $scope.menu.toggle = function() {
    $scope.menu.isActive = !$scope.menu.isActive;
  }

  $scope.$watch(function() { return MenuSrvc.current; }, function(current) {
    $scope.menu.current = current;
  });
});

controllers.controller("HomeCtrl", function($scope, MenuSrvc) {
  MenuSrvc.select("home");
});

controllers.controller("TechnologiesCtrl", function($scope, MenuSrvc, moment) {
  MenuSrvc.select("technologies");

  $scope.adoption = {};
  $scope.adoption.data = [
    {'key': 'Javascript', values: [[2014, 487971],[2013,327467],[2012,156521],[2011,60754],[2010,23095],[2009,8119],[2008,2060]]}
  , {'key': 'Java', values: [[2014, 394101],[2013,230600],[2012,111277],[2011,46227],[2010,14342],[2009,4157],[2008,596]]}
  ];
  $scope.adoption.xAxisTickFormat = function() { return function(d, i) { return d; }; };
  $scope.adoption.yAxisTickFormat = function() { return function(d, i) { return parseInt(d/1000)+'k'; }; };
});

controllers.controller("LogoCtrl", function($scope) {
  $scope.logo = {
    icon: 'send'
  , size: 256
  , color: 'cd4436'
  , background: 'ffffff'
  };
});

controllers.controller("StoriesCtrl", function($scope, MenuSrvc) {
  MenuSrvc.select("stories");
});

controllers.controller("LabCtrl", function($scope, MenuSrvc) {
  MenuSrvc.select("lab");
});

'use strict';

var directives = angular.module('rpApp.directives', []);

directives.directive('rpHidden', function($window) {
  return {
    restrict: 'A'
  , scope: {}
  , link: function($scope, $element) {
      var window = angular.element($window);

      var handler = function() {
        var scrollTop = window.scrollTop()
          , elementY = $element.height();

        if (scrollTop > elementY) $element.addClass('rp-hidden');
        else $element.removeClass('rp-hidden');
      };

      window.on('scroll', handler);

      handler();
    }
  };
});
