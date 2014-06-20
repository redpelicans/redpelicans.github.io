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
    .when('/services/:id?', {
      templateUrl: 'views/services.html'
    , controller: 'ServicesCtrl'
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

'use strict';

var services = angular.module(
  'rpApp.services'
, []
);

services.service("MenuSrvc", function() {
  var that = this;
  that.items = [
    { name: 'home', icon: 'home', url: '/' }
  , { name: 'services', icon: 'briefcase', url: '/#/services' }
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

controllers.controller('AppCtrl', function($scope, $routeParams, $document, $location, $anchorScroll) {
  $scope.$on('$viewContentLoaded', function() {
    // console.log(document.getElementById('#'+$routeParams.id))
    // var element = angular.element.find('#'+$routeParams.id);
    // console.log(angular.element.find('#'+$routeParams.id))
    // if ($routeParams.id) $document.scrollTo(element[0].height());

    // var someElement = angular.element(document.getElementById($routeParams.id));
    // console.log(someElement)
    // $document.scrollToElement(someElement, 0, 2000);

    $location.hash($routeParams.id);
    $anchorScroll();
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

controllers.controller("ServicesCtrl", function($scope, MenuSrvc, $routeParams, $document) {
  MenuSrvc.select("services");

  $scope.xAxisTickFormat = function() {
    return function(d, i) { return d; };
  }
  $scope.exampleData = [
                  {
                      "key": "Series 1",
                      "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6] ]
  }
  ]
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
