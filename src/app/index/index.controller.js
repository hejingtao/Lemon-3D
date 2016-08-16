/**
 * ------------------------------------------------------------------
 * Index模块 控制器
 * ------------------------------------------------------------------
 */



app.controller('index', function($scope, $rootScope, $timeout, $state, $http, $rootScope, $ocLazyLoad,  authService, tools, ENV) {
  
  $rootScope.bodyState = 'index';  
    $ocLazyLoad.load({
    serie: true,
    files: [
      '/assets/libs/index/page1/css/component.css',
      '/assets/libs/index/page1/js/TweenLite.min.js',
      '/assets/libs/index/page1/js/EasePack.min.js',
      '/assets/libs/index/page1/js/rAF.js',
      '/assets/libs/index/page1/js/page-1.js'
    ]
  });
})

app.controller('popular', function($scope, $rootScope, $timeout, $state, $http, $rootScope, $ocLazyLoad,  authService, tools, ENV) {
  
  $rootScope.bodyState = 'index';  
    $ocLazyLoad.load({
    serie: false,
    files: [
      '',

    ]
  });
})