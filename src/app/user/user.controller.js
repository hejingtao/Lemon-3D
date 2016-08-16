/**
 * ------------------------------------------------------------------
 * User模块 控制器
 * ------------------------------------------------------------------
 */
// 用户中心
app.controller('userCentre', function($scope, $rootScope, $state, $http, tools, ENV) {
  	
  	$rootScope.bodyState = 'index';


  	// 自动获取用户关注的用户的动态列表
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/user/getUserActivityList',
		params: { 
			'page': 0,
			'size': 10
		}
	})
	.success(function(data, status, headers, config) {

		$scope.data = data.data;
		$scope.totalPage = data.totalPage;
		$scope.nowPage = data.nowPage;
	});
		

	// 发表动态
	$scope.addActivity = function(){

		$http({
			method: 'POST', 
			url: ENV.baseUrl + '/user/addActivity',
			params: { 
				'content': $scope.activityContent ,
				'type': 1
			}
		})
		.success(function(data, status, headers, config) {

			tools.msg('发表动态成功')
		});
	}
})



// 用户关注列表
app.controller('userFollowing', function($scope, $rootScope, $state, $http, tools, ENV) {
  
	$rootScope.bodyState = 'index';  
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/user/getUserStartList',
		params: { 
			'userId': 10,
		  	'page': 0,
		  	'size': 10
		}
	})
	.success(function(data, status, headers, config) {

			$scope.data = data.data;
			$scope.totalPage = data.totalPage;
			$scope.nowPage = data.nowPage;
	});
})



// 用户粉丝列表
app.controller('userFollower', function($scope, $rootScope, $state, $http, tools, ENV) {

	// 获取用户关注者列表
	$rootScope.bodyState = 'index';  
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/user/getUserFollowersList',
		params: { 
			'userId': 10,
		  	'page': 0,
		  	'size': 10
		}
	})
	.success(function(data, status, headers, config) {

			$scope.data = data.data;
			$scope.totalPage = data.totalPage;
			$scope.nowPage = data.nowPage;
	});
})




// 消息中心
app.controller('userMessage', function($scope, $rootScope, $state, $http, tools, ENV) {
  
	$rootScope.bodyState = 'index'; 
	// 获取用户消息列表 
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/user/getUserMessageList',
		params: { 
		  	'page': 0,
		  	'size': 10
		}
		}).
		success(function(data, status, headers, config) {

			$scope.data = data.data;
			$scope.totalPage = data.totalPage;
			$scope.nowPage = data.nowPage;
		}).
		error(function(data, status, headers, config) {
			tools.alert('拉取消息失败，请稍后重试');
	});


	// 发送消息
	$scope.sendMessage = function(){

		if($scope.messageConent != ''){ tools.alert('请输入内容'); return null};
		$http({
			method: 'POST', 
			url: ENV.baseUrl + '/user/getUserMessageList',
			params: { 
			  	'page': 0,
			  	'size': 10
			}
		})
		.success(function(data, status, headers, config) {

				$scope.data = data.data;
				$scope.totalPage = data.totalPage;
				$scope.nowPage = data.nowPage;
		});
	}

})




// 作品列表
app.controller('productList', function($scope, $rootScope, $state, $stateParams, $http, tools, ENV) {
  
	$rootScope.bodyState = 'index';  
	// $stateParams.userId;

	// $http({
	// 	method: 'POST', 
	// 	url: ENV.baseUrl + '/user/getUserMessageList',
	// 	params: { 
	// 	  	'page': 0,
	// 	  	'size': 10
	// 	}
	// })
	// .success(function(data, status, headers, config) {

	// 		$scope.data = data.data;
	// 		$scope.totalPage = data.totalPage;
	// 		$scope.nowPage = data.nowPage;
	// });
})