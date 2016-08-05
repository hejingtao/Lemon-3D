/**
 * ------------------------------------------------------------------
 * 管理员模块 控制器
 * ------------------------------------------------------------------
 */


app.controller('operate', function($scope, $rootScope, $timeout, $state, $http, $rootScope, $ocLazyLoad,  authService, tools, ENV) {
	
	$rootScope.bodyState = 'operate'; 
    $ocLazyLoad.load({
	  serie: true,
	  files: [
	    '/assets/js/require.js',
	    '/assets/js/operate.js',
	    '/assets/libs/css/colpick.css'
	  ]
	});
})


app.controller('product', function($scope, $rootScope, $timeout, $state, $http, $rootScope, $ocLazyLoad,  authService, tools, ENV) {
	
	$rootScope.bodyState = 'operate'; 
    $ocLazyLoad.load({
	  serie: true,
	  files: [
	    '/assets/js/require.js',
	    '/assets/js/operate.js',
	    '/assets/libs/css/colpick.css'
	  ]
	});
})