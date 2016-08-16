/**
 * ------------------------------------------------------------------
 * Community模块 控制器
 * ------------------------------------------------------------------
 */
// 版块列表＋帖子列表
app.controller('community', function($scope, $rootScope, $stateParams, $state, $http, tools, ENV) {
  	
  	$rootScope.bodyState = 'index';
  	$scope.title = '版块列表';
	$scope.postsNum = 0;
	$scope.commentNum = 0;
	$scope.todayNum = 0;

	$scope.sectionId = $stateParams.sectionId ? $stateParams.sectionId: 1;
	// 已加载板块列表，且传入板块id
	if($rootScope.sections != undefined){

		$scope.init();
	}else{
	  	// 获取版块列表
		$http({
			method: 'POST', 
			url: ENV.baseUrl + '/bbs/getSections'
		})
		.success(function(data, status, headers, config) {

				$rootScope.sections = data.section;
				$scope.init();
		});
	}

	$scope.init = function(){
		
		angular.forEach($rootScope.sections,function(item){

			if(item.sectionId == $stateParams.sectionId){
				$scope.title = item.sectionName;
				$scope.postsNum = item.sectionPostNum;
				$scope.commentNum = item.sectionCommentNum;
				$scope.todayNum = item.sectionTodayPostNum;
			}
		})
		// 获取帖子列表
	      $http({
	        method: 'POST', 
	        url: ENV.baseUrl + '/bbs/getPostList',
	        params: { 
	          'sectionId': $scope.sectionId,
	          'page': 0,
	          'size': 15
	        }
	      })
	      .success(function(res) {

	           $scope.posts = res.post;  //???????????????????????????
	           $scope.totalPage = res.totalPage;
	           $scope.nowPage = res.nowPage;
	      })
	}

	$scope.postTitle = '';
	$scope.postContent ='';

	$scope.post = function(){

		if($scope.postTitle.length<3 || $scope.postContent.length< 10){
			tools.msg('标题或内容过短');
			return null;
		}else{
			$http({
		        method: 'POST', 
		        url: ENV.baseUrl + '/bbs/addPost',
		        params: { 
		          'sectionId': $scope.sectionId,
		          'title': $scope.postTitle,
		          'content': $scope.postContent
		        }
		      })
		      .success(function(res) {

		           $scope.posts = res.post;  //???????????????????????????
		           $scope.totalPage = res.totalPage;
		           $scope.nowPage = res.nowPage;
		      })
		}
	}

}

app.controller('community', function($scope, $rootScope, $stateParams, $state, $http, tools, ENV) {
  	
	if($stateParams.postId == undefined){
		tools.alert('帖子id为空！');
		$state.go('main.community');
		return null;
	}else{
		$scope.postId = $stateParams.postId;
		$scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum : 1;
	}

	// 获取帖子详情
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/bbs/getPostDetail',
		params: { 
		  'postId': $scope.postId
		}
	})
	.success(function(data) {

	   $scope.postDetail = data.post;
	})

	// 获取评论列表
	$http({
		method: 'POST', 
		url: ENV.baseUrl + '/bbs/getPostReplyList',
		params: { 
		  'postId': $scope.postId,
		  'page': ($scope.pageNum-1),
		  'size': 10
		}
	})
	.success(function(res) {

	   $scope.commentList = res.data;
	   $scope.totalPage = res.totalPage;
	   $scope.nowPage = res.nowPage;
	})

	// 发表评论
	$scope.commentContent = '';
	$scope.comment = function(){
		if($scope.commentContent.length < 10){
			tools.msg('评论内容过短');
			return null;
		}else{
			
			$http({
				method: 'POST', 
				url: ENV.baseUrl + '/bbs/addReply',
				params: { 
				  'postId': $scope.postId,
				  'replyContent': $scope.commentContent
				}
			})
			.success(function(res) {

			   tools.msg('评论成功！');
			})
		}
	}
}


})