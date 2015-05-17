
var siteApp = angular.module('siteApp', ['ngRoute']);

siteApp.config(function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'templates/overviewSite.html',
    controller: 'OverviewSiteController'
  }).
  when('/:pageID', {
    templateUrl: 'templates/detailSite.html',
    controller: 'DetailSiteController'
  }).
  otherwise({
    redirectTo: '/'
  });
});


siteApp.controller('OverviewSiteController', function ($scope, $http){
  $http.get(assetPathConfig).success(function(data) {
    $scope.siteAssets = data;
    //console.log("Success loading " + assetPathConfig + ".");
  }).
  error(function (data) {
    console.error(data);
  });
});


siteApp.controller('DetailSiteController', function ($scope, $routeParams, $http) {
  $scope.pageID = $routeParams.pageID;
  $http.get(assetPathConfig).success(function(data) {
    $scope.pageData = data.filter(function(entry) {
      return entry.pageID === $scope.pageID; // be shure both values are the same data type!
    })[0];

  }).
  error(function (data) {
    console.error(data);
  });
});
