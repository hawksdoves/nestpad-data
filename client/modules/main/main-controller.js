angular.module('app.main').controller('MainCtrl', function($scope){

  // DATA
  
  $scope.tabs = tabs;
});

// OBJECTS

var tabs = [
  { name: "ANALYSIS", route:".analysis" },
  { name: "Data", route:".entry" },
  { name: "Columns", route:".property" }
];