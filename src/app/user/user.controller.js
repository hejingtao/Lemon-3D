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
			'size': 10,
			'userId': 4
		}
	})
	.success(function(data, status, headers, config) {

		$scope.timeline = data.activity;
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
  
  	if($state.params.userId== null){
  		tools.alert('错误的用户id!');
  		$state.go('main.userCentre');
  	}else{
  		$scope.userId = $state.params.userId;
  	}

	$rootScope.bodyState = 'index';  
	// 获取用户信息
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/user/getOtherUserDetail',
		params: { 
			'userId': $state.params.userId
		}
	})
	.success(function(data, status, headers, config) {

			$scope.currentUser = data.user;
	});

	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/user/getUserStartList',
		params: { 
			'userId': $state.params.userId,
		  	'page': 0,
		  	'size': 10
		}
	})
	.success(function(data, status, headers, config) {

			$scope.user = data.user;
			$scope.totalPage = data.totalPage;
			$scope.nowPage = data.nowPage;
	});
})



// 用户粉丝列表
app.controller('userFollower', function($scope, $rootScope, $state, $http, tools, ENV) {

  	if($state.params.userId== null){
  		tools.alert('错误的用户id!');
  		$state.go('main.userCentre');
  	}else{
  		$scope.userId = $state.params.userId;
  	}
	
	$rootScope.bodyState = 'index';  
	// 获取用户信息
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/user/getOtherUserDetail',
		params: { 
			'userId': $state.params.userId
		}
	})
	.success(function(data, status, headers, config) {

			$scope.currentUser = data.user;
	});
	// 获取用户关注者列表
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/user/getUserFollowersList',
		params: { 
			'userId': $state.params.userId,
		  	'page': 0,
		  	'size': 10
		}
	})
	.success(function(data, status, headers, config) {

			$scope.user = data.user;
			$scope.totalPage = data.totalPage;
			$scope.nowPage = data.nowPage;
	});
})


// 用户详情
app.controller('userDetails', function($scope, $rootScope, $state, $http, tools, ENV) {
  	
  	if($state.params.userId== null){
  		tools.alert('错误的用户id!');
  		$state.go('main.userCentre');
  	}else{
  		$scope.userId = $state.params.userId;
  	}

	$rootScope.bodyState = 'index';  
	// 获取用户信息
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/user/getOtherUserDetail',
		params: { 
			'userId': $state.params.userId
		}
	})
	.success(function(data, status, headers, config) {

			$scope.currentUser = data.user;
	});
	// 获取用户动态
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/user/getUserActivity',
		params: { 
			'userId': $state.params.userId,
			'page': 0,
			'size': 10
		}
	})
	.success(function(data, status, headers, config) {

			$scope.timeline = data.data;
			$scope.totalPage = data.totalPage;
			$scope.nowPage = data.nowPage;
	});
	// 获取作品列表
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/product/getProductList',
		params: { 
			'userId': $state.params.userId,
			'page': 0,
			'size': 4
		}
	})
	.success(function(data, status, headers, config) {

			$scope.productList = data.product;
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
app.controller('productList', function($scope, $rootScope, $state, $http, tools, ENV) {
  
  	if($state.params.userId== null){
  		tools.alert('错误的用户id!');
  		$state.go('main.userCentre');
  	}else{
  		$scope.userId = $state.params.userId;
  	}
	$rootScope.bodyState = 'index';  

	// 获取用户信息
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/user/getOtherUserDetail',
		params: { 
			'userId': $state.params.userId
		}
	})
	.success(function(data, status, headers, config) {

			$scope.currentUser = data.user;
	});
	// 获取作品列表
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/product/getProductList',
		params: { 
			'userId': $state.params.userId,
			'page': 0,
			'size': 4
		}
	})
	.success(function(data, status, headers, config) {

			$scope.productList = data.product;
	});

})