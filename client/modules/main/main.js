angular
  .module('app.main', [
    'ui.router',
    'app.common',
    'app.entry',
    'app.property',
    'app.analysis'
  ])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state("main", {
        url: '/',
        abstract: true,
        templateUrl: 'modules/main/main.html',
        controller: 'MainCtrl'
      })
        .state("main.analysis", { 
          url: '',
          templateUrl: 'modules/analysis/analysis.html',
          controller: 'AnalysisCtrl'
        })
        .state("main.entry", { 
          url: 'entry', 
          templateUrl: 'modules/entry/entry.html',
          controller: 'EntryCtrl'
        })
        .state("main.property", { 
          url: 'property',
          templateUrl: 'modules/property/property.html',
          controller: 'PropertyCtrl'
        });

    $urlRouterProvider.when("/main", "/main/analysis");
  });