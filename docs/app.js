
angular.module('Lemon3D.directive',[])

// pdf显示 弹出层
.directive("pdf", function() {
    return {
        restrict : "EA",
        replace: true,
        scope: {
          url: "@",
          close: "&"
        },
        templateUrl :  'product/pdf-viewer.html',
        link: function (scope, element, attrs) {
          DEFAULT_URL = attrs.url;
        }
    };
});






angular.module('Lemon3D.filter',[])

.filter('map', function(){
    var filter = function(input){
      return input + '...';
    };
    return filter;
  });










var app = angular.module('Lemon3D', [
  
  'ngAnimate', //动画
  'ngStorage', //本地存储
  'oc.lazyLoad',
  'ngFileUpload',

  'Lemon3D.auth', //权限控制
  'Lemon3D.router', //路由定义
  // 'Lemon3D.partials', //页面组件
  'Lemon3D.service',
  'Lemon3D.directive'
  ]);

// 1、vr数据获取的是最旧的，不是最新的
// 2、作品添加json数据跑到file分类去了，同时json数据会多处一个空字符""
// 3、


app.run(
  function($rootScope, $state,  $interval, $localStorage, authService, tools) {

    $rootScope.bodyState = 'index';
    // 绑定$localStorage至$storage中
    $rootScope.$storage = $localStorage;

    // // 初始化时判断是否有token存在，设置登陆状态
    if($localStorage.isAuth == true){

      // 登陆状态
      $rootScope.loginState = true;
      // authtoken
      $rootScope.authtoken = $localStorage.authtoken;
           // 设置用户信息
      $rootScope.USER_ID = $localStorage.USER_ID;
      $rootScope.USER_NAME = $localStorage.USER_NAME;
      $rootScope.USER_PHONE = $localStorage.USER_PHONE;
      $rootScope.USER_ACCOUNT = $localStorage.USER_ACCOUNT;
      
      $rootScope.userData = $localStorage.userData;
      console.log($rootScope.userData );
    }else{

      // $rootScope.loginState = false;
      $rootScope.loginState = false;
    }


    // 监听路由变化，判断是否有权限登陆
    // $rootScope.$on('$stateChangeSuccess', 
    // function(event, toState, toParams, fromState, fromParams, options){ 
    //     if(toState.name == 'login'){
    //       return null;
    //     }
    //     console.log((toState.name.indexOf('operate') != -1));
    //     if((toState.name.indexOf('operate') != -1) || (toState.name.indexOf('product') != -1)){
            
    //         event.preventDefault();
    //         window.webGLInterval = setInterval(function(){

    //           console.log($('#operate-content .left #WebGL-output').height())
    //           if($('#operate-content .left #WebGL-output').height() > 0){
    //             window.clearInterval(webGLInterval);
    //           }
                  
                  
    //           if(($('#operate-content .left #WebGL-output').height() == 0) && ($('#operate-content .left').height() > 0)){
    //               container = document.getElementById("WebGL-output").appendChild(renderer.domElement);
    //               console.log('resize webgl');
    //               window.clearInterval(webGLInterval);
    //           }

    //         },100)
            

    //       // console.log($rootScope.loginState);
    //     }else{
    //       clearInterval(webGLInterval);
    //     }
    //     // console.log(fromState);
    //     // console.log(toState);
    // })


  }
);



app.controller('main', function($scope, $rootScope, $http, ENV, tools, authService) {
  
  $rootScope.bodyState = 'index';  
  $scope.exit = function(){
    authService.logout();
  }

  // 关注用户
  $scope.startUser = function(userId, type){

    $http({
      method: 'POST', 
      url: ENV.baseUrl + '/user/startUser',
      params: { 
        'targetUserId': userId,
        'type': type
      }
    })
    .success(function(data, status, headers, config) {

        tools.msg('操作成功');
    });
  }
})



/**
 * ------------------------------------------------------------------
 * app 路由模块，前端路由定义，使用uiRouter
 * ------------------------------------------------------------------
 */

angular.module('Lemon3D.router',['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  /**
   * index模块
   * ------------------------------------------------------------------
   */
  // 首页
  .state('main', {
    url: '/main',
    views: {  
        "page": {
          templateUrl: 'main.html',
          controller: 'main'
        }
      }   
  })
  .state('main.index', {
    url: '/index',
    cache: false,
    views: {  

        "contain@main": {
          templateUrl: 'index/index.html',
          controller: 'index'
        }
      }   
  })
  .state('main.index1', {
    url: '/index1',
    views: {
        "contain@main": {
          templateUrl: 'index/index.html',
          controller: 'index'
        }
      }   
  })
  // 热门排行
  .state('main.popular', {
    url: '/popular',
    views: {
        "contain@main": {
          templateUrl: 'index/popular.html',
          controller: 'popular'
        }
      }   
  })

  /**
   * 登录模块
   * ------------------------------------------------------------------
   */
  // 登录界面
  .state('main.login', {
    url: '/login',
    views: {
        "contain@main": {
          templateUrl: 'login/login.html',
          controller: 'login'
        }
      }   
  })
  // 忘记密码界面
  .state('main.register', {
    url: '/register',
    views: {
        "contain@main": {
          templateUrl: 'login/register.html',
          controller: 'register'
        }
      }   
  })




  /**
   * user模块
   * ------------------------------------------------------------------
   */
  // 用户主界面
  .state('main.userCentre', {
    url: '/userCentre',
    cache: false,
    views: {
        "contain@main": {
          templateUrl: 'user/userCentre.html',
          controller: 'userCentre'
        }
      }   
  })
  // 用户详情
  .state('main.userDetails', {
    url: '/userDetails/:userId',
    views: {
        "contain@main": {
          templateUrl: 'user/userDetails.html',
          controller: 'userDetails'
        }
      }   
  })
  // 关注列表
  .state('main.userFollowing', {
    url: '/userFollowing/:userId',
    views: {
        "contain@main": {
          templateUrl: 'user/userFollowing.html',
          controller: 'userFollowing'
        }
      }   
  })
  // 粉丝列表
  .state('main.userFollower', {
    url: '/userFollower/:userId',
    views: {
        "contain@main": {
          templateUrl: 'user/userFollower.html',
          controller: 'userFollower'
        }
      }   
  })
  // // 私信中心
  .state('main.userMessage', {
    url: '/userMessage',
    views: {
        "contain@main": {
          templateUrl: 'user/userMessage.html',
          controller: 'userMessage'
        }
      }   
  })
  // // 产品列表
  .state('main.productList', {
    url: '/productList/:userId',
    cache: false,
    views: {
        "contain@main": {
          templateUrl: 'user/productList.html',
          controller: 'productList'
        }
      }   
  })
  //收藏作品列表
  .state('main.collect', {
    url: '/collect/:userId',
    cache: false,
    views: {
        "contain@main": {
          templateUrl: 'user/productList.html',
          controller: 'collect'
        }
      }   
  })


  /**
   * product模块
   * ------------------------------------------------------------------
   */
  // 编辑作品
  .state('operate', {
    url: '/operate',
    cache: false,
    views: {
        "page": {
          templateUrl: 'product/operate.html',
          controller: 'operate'
        }
      }   
  })
  // 作品展示
  .state('product', {
    url: '/product/:productId',
    cache: false,
    views: {
        "page": {
          templateUrl: 'product/product.html',
          controller: 'product'
        }
      }   
  })
  // vr
  .state('vr', {
    url: '/vr/:productId',
    views: {
        "page": {
          templateUrl: 'product/vr.html',
          controller: 'vr'
        }
      }   
  })
  //vr test
  .state('test', {
    url: '/test',
    views: {
        "page": {
          templateUrl: 'product/vr.html',
          controller: 'vrTest'
        }
      }   
  })
  /**
   * 社区模块
   * ------------------------------------------------------------------
   */
  // 
  .state('main.community', {
    url: '/community/:sectionId/:pageNum',
    views: {
        "contain@main": {
          templateUrl: 'community/community.html',
          controller: 'community'
        }
      }   
  })
  .state('main.post', {
    url: '/post/:postId',
    views: {
        "contain@main": {
          templateUrl: 'community/post.html',
          controller: 'post'
        }
      }   
  })


  $urlRouterProvider.otherwise(function($injector, $location){
        console.log($injector);
        console.log($location.url());
    })
  ;
})












/**
 * ------------------------------------------------------------------
 * app service模块
 * ------------------------------------------------------------------
 */
angular.module('Lemon3D.service',[ ])

/**
 * 环境常量定义
 * 
 * ------------------------------------------------------------------
 */
.service('ENV', function() {
  return{
    baseUrl: 'http://119.29.209.29/lemon3d'
    // baseUrl: 'http://localhost:8080/lemon3d'
  }
})

/**
 * tools 工具service，封装layer插件，提供常用操作方法
 * 
 * layer官网：http://layer.layui.com/
 * ------------------------------------------------------------------
 */
.service('tools', function($state,$rootScope) {

  return {
    // 检查登录状态，后期移动到路由改变事件，无需手动监测
    checkLogin: function(address) {
      if(localStorage.user_id == null){
        $state.go('login', {lastPage: address});
      }
    },
  /**
   * 显示加载状态条
   *
   * 0为hover头像姓名，展示用户信息；1为hover用户信息栏，消除定时器；-1为mouseleave，添加定时器（0.5s）
   *
   * @param    {number}  time     超时时间
   * @param    {string}  error    超时错误提示
   * @returns  void
   *
   * @date     2016-07-12
   * @author   hejingtao<hejigntao@foxmail.com>
   */
    load: function(time,error) {
      var loading = layer.load(2, {
        shade: [0.6,'#fff'] //0.1透明度的白色背景
      });
      $rootScope.loading = true;
      var timeout  = setTimeout(function() {
        if($rootScope.loading == true){
          layer.closeAll('loading'),
          layer.alert(error, {
            skin: 'layui-layer-lan'
            ,closeBtn: 1
            ,shift: 5 //动画类型
          });
        }
      }, time);
    },
  /**
   * 隐藏加载状态条
   *
   * 隐藏加载状态条，修改加载状态
   *
   * @param    none
   * @returns  void
   *
   * @date     2016-07-12
   * @author   hejingtao<hejigntao@foxmail.com>
   */
    hide: function() {
      layer.closeAll('loading');
      $rootScope.loading = false;
    },

    // 分页方法
    splitPage :function(nowPage,totalPage) {
      var resultArr = new Array();
      var tempLeftArr = new Array();
      var tempRightArr = new Array();
      var tempMin = 0;
      var tempMax =0;
      var lastPage = null;
      var nextPage = null;
      for(var i = 1;i<4;i++){
        tempMin = nowPage-i;
        tempMax = nowPage+i;
        if(tempMin>0){
          tempLeftArr.unshift(tempMin);
        }
        if(tempMax<totalPage){
          tempRightArr.push(tempMax);
        }
      }
      if((nowPage-1)>0){
        lastPage = nowPage -1;
      }
      if((nowPage+1)<totalPage){
        nextPage = nowPage +1;
      }
      resultArr[0] = lastPage;
      resultArr[1] = tempLeftArr;
      resultArr[2] = nowPage;
      resultArr[3] = tempRightArr;
      resultArr[4] = nextPage;
      return resultArr;
    },
    /**
     * 显示提示框
     *
     * 弹出提示框
     *
     * @param    {string}  message    提示文字信息
     * @returns  void
     *
     * @date     2016-07-12
     * @author   hejingtao<hejigntao@foxmail.com>
     */
    alert: function(message) {
        layer.alert(message, {
          skin: 'layui-layer-lan'
          ,closeBtn: 0
          ,shift: 0 //动画类型
        });
    },

    msg: function(message){

      layer.msg(message);
    },

    prompt: function(message,func){

      layer.prompt({
        title: message,
        formType: 2 //prompt风格，支持0-2
      }, function(pass){

          func(pass);
      });
    }
  }
})

// http拦截
.factory('httpInterceptor', [ '$q', '$injector','$rootScope',function($q, $injector, $rootScope) {  
        var httpInterceptor = {  
            request: function (config) {

              if($rootScope.$storage.authtoken != undefined){
                   // config.headers['user_token'] = $rootScope.$storage.authtoken;
                   config.headers['Authorization'] =  $rootScope.$storage.authtoken;
              }
              // config.headers['Content-Type'] = 'application/json';
              // config.headers['Accept'] = 'application/json';
              config.requestTimestamp = new Date().getTime();
              return config;
            },
            'responseError' : function(response) {  

                console.log(response)

                
                alert(response.data.message)
                layer.closeAll('loading');
                $rootScope.loading = false;


                return $q.reject(response);  
            },  
            'response' : function(response) {  

                return response;  

            }  
        }
        var alert = function(message) {
            layer.alert(message, {
              skin: 'layui-layer-lan'
              ,closeBtn: 0
              ,shift: 0 //动画类型
            });
        }
        return httpInterceptor;  
    }   
])


.config(function($stateProvider, $httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor')
})



/**
 * ------------------------------------------------------------------
 * app auth模块
 * ------------------------------------------------------------------
 */
 angular.module('Lemon3D.auth',[ ])


/**
 * 权限控制服务
 * 
 * ------------------------------------------------------------------
 */

 .factory('authService', authService); 

 /** @ngInject */ 
 function authService($http, $log, $localStorage, $rootScope, $state, ENV, tools) { 

    var authServices = { 
      login: login, 
      logout: logout, 
      getAuthorizationParams: getAuthorizationParams
    }; 

    return authServices; 


//////////////// 
/**        
* 定义处理错误函数，私有函数。        
* @param {type} xxx       
* @returns {*}        
* @private        
**/ 
function handleError(name, error) {   
  return $log.error('XHR Failed for ' + name + '.\n', angular.toJson(error, true)); 
} 



/**        
* 定义login函数，公有函数。        
* 若登录成功，把服务器返回的token存入localStorage。        
* @param {type} xxx        
* @returns {*}        
* @public        
*/ 
function login(loginData) { 
  var apiLoginUrl = ENV.baseUrl + '/user/login';
  return $http({ 
    method: 'POST', 
    url: apiLoginUrl, 
    params: { 
      'userAccount': loginData.account, 
      'userPassword': loginData.password
    }
  }) 
  .then(loginComplete); 




  function loginComplete(response) { 
    console.log(response);
    if (response.status === 200 ) {

      var user = response.data.data.user;
     // 将token存入localStorage
     $localStorage.authtoken = user.userCurrentToken; 
     console.log($localStorage.authtoken);
     // 设置授权状态
     setAuthorizationParams(true);
     $localStorage.userData = $rootScope.userData = user;
     // 设置用户信息
     $localStorage.USER_ID = $rootScope.USER_ID = user.userId;
     $localStorage.USER_NAME = $rootScope.USER_NAME = user.userName;
     $localStorage.USER_PHONE = $rootScope.USER_PHONE = user.userPhone;
     $localStorage.USER_ACCOUNT = $rootScope.USER_ACCOUNT = user.userAccount;

     $state.go('main.index',{},{'reload': true});

    }else { 
        if(response.code == 1005){
          tools.alert('账号或密码错误')
        }
        if(response.code == 1006){
          tools.alert('change password')
        }
        $localStorage.authtoken = ''; 
        setAuthorizationParams(false);
        tools.alert('登陆失败！请重试！')
    }
  }   

} 


/**        
* 定义logout函数，公有函数。        
* * 清除localStorage中的数据。        
* * @public        
* */ 

function logout() { 

      setAuthorizationParams(false);
      $rootScope.$storage.authtoken = null;
      tools.msg('退出成功！');
      $state.go('main.index',{},{'reload': true});
} 

/**        
* 定义传递数据的setter函数，私有函数。        
* * 用于设置isAuth参数。        
* * @param {type} xxx        
* * @returns {*}        
* * @private        
* */ 

function setAuthorizationParams(param) { 
  $localStorage.isAuth = param; 
  $rootScope.loginState = param;
} 


/**        
 * * 定义获取数据的getter函数，公有函数。        
 * * 用于获取isAuth和token参数。        
 * * 通过setter和getter函数，可以避免使用第四种方法所提到的$watch变量。        
 * * @param {type} xxx        
 * * @returns {*}        
 * * @public        
 * */ 

 function getAuthorizationParams() { 
    var authParams = { 
      isAuth: $localStorage.isAuth, 
      authtoken: $localStorage.authtoken 
    }; 
    return authParams; 
  } 



}


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
	$scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum: 1;


	$scope.init = function(){
		
		angular.forEach($rootScope.sections,function(item){

			if(item.sectionId == $scope.sectionId){
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
	          'page': ($scope.pageNum-1),
	          'size': 15
	        }
	      })
	      .success(function(res) {

	           $scope.posts = res.post;  //???????????????????????????
	           $scope.totalPage = res.totalPage;
	           $scope.nowPage = res.nowPage;
	           $scope.pageList = tools.splitPage($scope.nowPage, $scope.totalPage);
	      })
	}


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


	$scope.postTitle = '';
	$scope.postContent ='';

	// 发表帖子
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
		      	tools.msg('发帖成功');
		      	$state.reload();
		      })
		}
	}

})

app.controller('post', function($scope, $rootScope, $stateParams, $state, $http, tools, ENV) {

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

	   $scope.postDetails = data.post;
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
	   $scope.pageList = tools.splitPage($scope.nowPage, $scope.totalPage);
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
})



/**
 * ------------------------------------------------------------------
 * 管理员模块 控制器
 * ------------------------------------------------------------------
 */


app.controller('operate', function($scope, $rootScope, $state, $http, $ocLazyLoad, tools, ENV, Upload) {

	$scope.currentProductId = 0;
	$rootScope.bodyState = 'operate'; 
    $ocLazyLoad.load({
	  serie: true,
	  files: [
	    '/assets/js/require.js',
	    '/assets/js/operate.js',
	    '/assets/libs/css/colpick.css'
	  ]
	});

    console.log('et');
    // 创建作品
    $scope.creatProduct = function(){

	    Lemon.layer.prompt({
          title: '请输入作品标题',
          formType: 2 //prompt风格，支持0-2
        }, function(name){

            $http({
		      method: 'POST', 
		      url: ENV.baseUrl + '/product/addProduct',
		      params: { 
		        'productTitle': name,
		        'productDetails': 'test', // 1代表json，0代表文件
		        'productStatus': 1
		      }
		    })
		    .success(function(data, status, headers, config) {
		    	$scope.product = data.product;
		    	$scope.currentProductId = $scope.product.productId;
		        tools.msg('新建作品成功。上传数据中，请稍等');
		        $scope.addProductData($scope.product.productId, Lemon.getSystemModel());
		        $scope.addProductFileList($scope.product.productId, Lemon.getUploadFileModel());

		    });
        });
    }

    // 更新作品
    $scope.updateProduct = function(){

    	if($scope.currentProductId == 0){
    		tools.alert('请先在线保存');
    	}
    	$scope.currentProductId
        tools.msg('上传数据中，请稍等');
        $scope.addProductData($scope.currentProductId, Lemon.getSystemModel(), 1);
        $scope.addProductFileList($scope.currentProductId, Lemon.getUploadFileModel());
    }


    $scope.uploadPdf = function(files){

    	if(files.length == 0){
          return null;
        }

        // 遍历文件列表检查文件后缀
        angular.forEach(files, function(file) {

          var reg =/[^\\\/]*[\\\/]+/g;  //匹配文件的名称和后缀的正则表达式
          var name = file.name.replace(reg, '');
          var postfix = /\.[^\.]+$/.exec(name);//获取文件的后缀 例如： .js
          postfix = postfix[0].toLowerCase(); //后缀转换成小写

          if(postfix != '.pdf'){
              tools.alert('检测到非pdf文件！')
          }
        });
        
	     tempData=  { 
          'productId': $scope.currentProductId,
          'pdfFile': files[0]
        }
		$http({
		　　 method: 'POST',
		　　 url: ENV.baseUrl + '/product/addDocument',
		  data: tempData,
		  headers: {
		    'Content-Type': undefined
		  },
		  transformRequest: function(data) {
		    var formData = new FormData();
		    formData.append('productId', data.productId);
		    formData.append('pdfFile', data.pdfFile);
		    return formData;
		  },
		  
		})
	    .success(function(data, status, headers, config) {

	        tools.msg('上传pdf成功');
	    });
    }

    // 添加作品json数据
    $scope.addProductData = function(productId,data,isNew){

    	var tempIsNew = isNew ? isNew : 0;

	     tempData=  { 
          'productId': productId,
          'dataContent': data,
          'isNew':  tempIsNew // 1为创建新版本
        }
		$http({
		　　 method: 'POST',
		　　 url: ENV.baseUrl + '/product/addProductData',
		  data: tempData,
		  headers: {
		    'Content-Type': undefined
		  },
		  transformRequest: function(data) {
		    var formData = new FormData();
		    formData.append('productId', data.productId);
		    formData.append('dataContent', JSON.stringify(data.dataContent));
		    formData.append('isNew', data.isNew);
		    return formData;
		  },
		  
		})
	    .success(function(data, status, headers, config) {

	        tools.msg('上传数据成功');
	    });
    }

    // 添加作品file数据
    $scope.addProductFileList = function(productId, dataList, isNew){

    	var tempIsNew = isNew ? isNew : 0;
    	var currentList = dataList.list;



    	for(var i=0;i<currentList.length;i++){
			   tempData=  {
			    'productId': productId,
			    'dataFile': currentList[i].file,
			    'isNew':  tempIsNew // 1为创建新版本
			  }
			$http({
			　　 method: 'POST',
			　　 url: ENV.baseUrl + '/product/addProductFile',
			  data: tempData,
			  headers: {
			    'Content-Type': undefined
			  },
			  transformRequest: function(data) {
			    var formData = new FormData();
			    formData.append('productId', data.productId);
			    formData.append('dataFile', data.dataFile);
			    formData.append('isNew', data.isNew);
			    return formData;
			  },
			  
			})
		    .success(function(data, status, headers, config) {

		        tools.msg('上传数据成功');
		    });
    	}

    }


    // 添加VR数据
    $scope.addVrData = function(){

    	var vrData = Lemon.creatVrPath();
        console.log(vrData);
	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/addVr',
	      params: { 
	        'productId': $scope.currentProductId,
	        'vrContent': vrData
	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('上传vr路径数据成功');
	    });
    }

    // vr提示
    $scope.vrTips = function(){

		Lemon.layer.tab({
		  area: ['600px', '300px'],
		  tab: [{
		    title: '使用说明', 
		    content: '1、点击［添加路径］，选择合适位置，添加路径球后可移动路径球位置进行调整，然后继续添加。</br>'+
		    		 '2、至少添加2个路径球，方可［合成上传］。'+
		    		 '3、存在作品的情况下方可［合成上传］，若是新作品请［在线保存］后再［合成上传］］'
		  }, {
		    title: '移动速度', 
		    content: '建议速度在0.1 ~ 1之间，否则会过快或过慢。'
		  }]
		});
    }


    // 添加文档
    $scope.addPdf = function(){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/addDocument',
	      params: { 
	        'productId': 'test',
	        'pdfFile': 1

	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('操作成功');
	    });
    }
})






// 展示作品
app.controller('product', function($scope, $rootScope, $interval, $state, $http, $ocLazyLoad, tools, ENV) {
	
  	if($state.params.productId== null){
  		tools.alert('错误的作品id!');
  		$state.go('main.userCentre');
  	}else{
  		$scope.productId = $state.params.productId;
  	}

	$rootScope.bodyState = 'operate'; 
    $ocLazyLoad.load({
	  serie: true,
	  files: [
	    '/assets/js/require.js',
	    '/assets/js/operate.js',
	    '/assets/libs/css/colpick.css'
	  ]
	});
   
    $scope.init =function(){
	    // 获取作品数据
	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getProductDetail',
	      params: { 
	        'productId': $scope.productId

	      }
	    })
	    .success(function(data, status, headers, config) {

	        $scope.productData = data.product;
	        var tempJsonList = $scope.productData.currentData.json;
	        var tempFileList = $scope.productData.currentData.file;

	        for(var i=0;i<tempJsonList.length;i++){

				$scope.recoverJson(tempJsonList[i]);
	        }

	        for(var i=0;i<tempFileList.length;i++){

	          var value = tempFileList[i];
		      var reg = /[^\\\/]*[\\\/]+/g; //匹配文件的名称和后缀的正则表达式
		      var name = value.replace(reg, '');
		      var postfix = /\.[^\.]+/.exec(name);//获取文件的后缀 例如： .js
		      postfix = postfix[0].toLowerCase(); //后缀转换成小写

				$.get(ENV.baseUrl+ tempFileList[i], [], function(data){

				    var oMyBlob = new Blob([data], { "type" : "text/plain" });
				    Lemon.loadModel(postfix, oMyBlob);
				});
	        }
	    });

	    // 自动获取评论数据
	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getProductCommentList',
	      params: { 
	        'productId': $scope.productId,
	        'page': 0,
	        'size': 10

	      }
	    })
	    .success(function(data, status, headers, config) {

	    	$scope.commentList = data.comment;

	    	$scope.commentTotalpage = data.totalpage;
	    	$scope.commnetNowpage = data.nowpage;
	        tools.msg('操作成功');
	    });
	}

	$scope.tempInterval = $interval(function(){
		console.log('test');
	    	if(typeof Lemon != 'undefined'){
			    $scope.init();
			    $interval.cancel($scope.tempInterval);
	    	}

	},100)
	


    // 获取json数据
    $scope.recoverJson = function(id){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getJson',
	      params: { 
	        'dataId': id

	      }
	    })
	    .success(function(data, status, headers, config) {

	    	var temp = JSON.parse(data.json);

	    	if( typeof temp.list != 'undefined'){
	    		Lemon.recoverSystemModel(temp.list);
	    	}else if(typeof temp.start != 'undefined'){
	    		Lemon.load3dComment(temp);
	    	}
	    	
	        tools.msg('操作成功');
	    });
    }


    // 获取file数据
    // $scope.getFile = function(){

	   //  $http({
	   //    method: 'POST', 
	   //    url: ENV.baseUrl + '/product/getJson',
	   //    params: { 
	   //      'dataId': 'test'

	   //    }
	   //  })
	   //  .success(function(data, status, headers, config) {

	   //      tools.msg('操作成功');
	   //  });
    // }


    // 获取评论列表
    $scope.getCommentList = function(){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getProductCommentList',
	      params: { 
	        'productId': $scope.productId,
	        'page': 0,
	        'size': 10

	      }
	    })
	    .success(function(data, status, headers, config) {

	    	$scope.commentList = data.comment;

	    	$scope.commentTotalpage = data.totalpage;
	    	$scope.commnetNowpage = data.nowpage;
	        tools.msg('操作成功');
	    });
    }

    // 添加作品json数据
    $scope.addProductData = function(productId,data,isNew){

    	var tempIsNew = isNew ? isNew : 0;

	     tempData=  { 
          'productId': productId,
          'dataContent': data,
          'isNew':  tempIsNew // 1为创建新版本
        }
		$http({
		　　 method: 'POST',
		　　 url: ENV.baseUrl + '/product/addProductData',
		  data: tempData,
		  headers: {
		    'Content-Type': undefined
		  },
		  transformRequest: function(data) {
		    var formData = new FormData();
		    formData.append('productId', data.productId);
		    formData.append('dataContent', JSON.stringify(data.dataContent));
		    formData.append('isNew', data.isNew);
		    return formData;
		  },
		  
		})
	    .success(function(data, status, headers, config) {

	        tools.msg('上传数据成功');
	    });
    }

    // 添加3d评论
    $scope.add3dComment = function(data, type){

        control.object = undefined;
        control.visible = false;
        if(!Lemon.commentClickNum){

            Lemon.layer.prompt({
              title: '请输入评论内容',
              formType: 2 //prompt风格，支持0-2
            }, function(name){
                // 添加评论球
                Lemon.addCommentBox(name);
            });
        }else if(Lemon.commentClickNum == 1){
            // 设置箭头指向位置
            Lemon.setCommentArrow();

        }else if(Lemon.commentClickNum == 2){
            // 创建3d评论
             var tempData = Lemon.creat3dComment();
             $scope.addProductData($scope.productId,tempData);
        }
    }

    // 添加普通评论
    $scope.addCommonComment = function(){

    	tools.prompt('请输入评论内容',function(data){

		    $http({
		      method: 'POST', 
		      url: ENV.baseUrl + '/product/addComment',
		      params: { 
		        'productId': $scope.productId,
		        'type': 1,  // 1为普通评论，2为3D评论
		        'content': data

		      }
		    })
		    .success(function(data, status, headers, config) {

		    	$scope.getCommentList();
		        tools.msg('操作成功');
		    });
    	})
    }


    // fork
    $scope.fork = function(){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/forkProduct',
	      params: { 
	        'productId': $scope.productId
	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('fork成功');
	    });
    }

    // start
    $scope.start = function(){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/startProduct',
	      params: { 
	        'productId': $scope.productId,
	        'type': 1   //1收藏 0取消
	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('start成功');
	    });
    }

  /**
   * pdf展示控制
   * ------------------------------------------------------------------
   */
    // pdf显示状态定义
    $scope.pdfstate = false;
    // pdf地址定义
    $scope.url = null;
    // pdf显示状态修改
    $scope.showpdf = function(type, file){
      if(type == 2){$scope.pdfstate = true; return null }
      if(type == 0){

        $scope.pdfstate = false;
      }else{


        $ocLazyLoad.load({
          serie: true,
          files: [
            '/assets/libs/pdf/viewer/viewer.js'
          ]
        });

        console.log(ENV.baseUrl+file)
        DEFAULT_URL = ENV.baseUrl+file;
        webViewerLoad();
        $scope.pdfstate = true;

      }
    }
})


// vr模式
app.controller('vr', function($scope, $rootScope, $interval, $state, $http, $rootScope, $ocLazyLoad,  authService, tools, ENV) {
	
  	if($state.params.productId== null){
  		tools.alert('错误的作品id!');
  		return null;
  	}else{
  		$scope.productId = $state.params.productId;
  	}

	$rootScope.bodyState = 'operate'; 
    $ocLazyLoad.load({
	  serie: true,
	  files: [
	    '/assets/js/require.js',
	    '/assets/js/vr.js'
	  ]
	});



    $scope.init =function(){
	    // 获取作品数据
	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getProductDetail',
	      params: { 
	        'productId': $scope.productId

	      }
	    })
	    .success(function(data, status, headers, config) {

	        $scope.productData = data.product;
	        var tempJsonList = $scope.productData.currentData.json;
	        var tempFileList = $scope.productData.currentData.file;

	        for(var i=0;i<tempJsonList.length;i++){

				$scope.recoverJson(tempJsonList[i]);
	        }

	        for(var i=0;i<tempFileList.length;i++){

	          var value = tempFileList[i];
		      var reg = /[^\\\/]*[\\\/]+/g; //匹配文件的名称和后缀的正则表达式
		      var name = value.replace(reg, '');
		      var postfix = /\.[^\.]+/.exec(name);//获取文件的后缀 例如： .js
		      postfix = postfix[0].toLowerCase(); //后缀转换成小写

				$.get(ENV.baseUrl+ tempFileList[i], [], function(data){

				    var oMyBlob = new Blob([data], { "type" : "text/plain" });
				    Lemon.loadModel(postfix, oMyBlob);
				});
	        }
	    });

	    // vr数据
	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getVr',
	      params: { 
	        'productId': $scope.productId
	      }
	    })
	    .success(function(data, status, headers, config) {

	  		$scope.vrData = Lemon.pathList = JSON.parse(data.vr.vrContent);
	        tools.msg('操作成功');
	    });
	}

	$scope.tempInterval = $interval(function(){
		console.log('test');
	    	if(typeof Lemon != 'undefined'){
			    $scope.init();
			    $interval.cancel($scope.tempInterval);
	    	}

	},100)
	
    // 获取json数据
    $scope.recoverJson = function(id){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getJson',
	      params: { 
	        'dataId': id

	      }
	    })
	    .success(function(data, status, headers, config) {
	    	var temp = JSON.parse(data.json);

	    	var temp = JSON.parse(data.json);

	    	if( typeof temp.list != 'undefined'){
	    		Lemon.recoverSystemModel(temp.list);
	    	}else if(typeof temp.start != 'undefined'){
	    		// vr模式不显示3d评论
	    		// Lemon.load3dComment(temp);
	    	}


	        tools.msg('操作成功');
	    });
    }


    // 获取file数据
    $scope.getFile = function(){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getJson',
	      params: { 
	        'dataId': 'test'

	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('操作成功');
	    });
    }


})



// 测试vr
app.controller('vrTest', function($scope, $rootScope, $interval, $state, $http, $rootScope, $ocLazyLoad,  authService, tools, ENV) {
	
	$rootScope.bodyState = 'operate'; 
    $ocLazyLoad.load({
	  serie: true,
	  files: [
	    '/assets/js/require.js',
	    '/assets/js/vr.js'
	  ]
	});



    $scope.init =function(){
	    
		$.get("/assets/js/three/demo0.lem3d", [], function(data){

		    Lemon.recoverSystemModel(JSON.parse(data));
		});

		var pathList= [{"position":{"x":95,"y":166,"z":376},"speed":"0.3","num":1,"length":68.24221567329127,"step":227,"move":{"x":-0.13215859030837004,"y":0.02643171806167401,"z":-0.2687224669603524}},{"position":{"x":65,"y":172,"z":315},"speed":"0.2","num":2,"length":96.78842906050289,"step":484,"move":{"x":0.012396694214876033,"y":0.09090909090909091,"z":-0.17768595041322313}},{"position":{"x":71,"y":216,"z":229},"speed":"0.4","num":3,"length":409.0305612053945,"step":1023,"move":{"x":-0.004887585532746823,"y":0,"z":-0.3998044965786901}},{"position":{"x":66,"y":216,"z":-180},"speed":"0.3","num":4,"length":93.4826187052973,"step":312,"move":{"x":0.003205128205128205,"y":-0.13782051282051283,"z":-0.266025641025641}},{"position":{"x":67,"y":173,"z":-263},"speed":"0.2","num":5,"length":207.5475849052453,"step":1038,"move":{"x":-0.023121387283236993,"y":0.007707129094412331,"z":-0.19845857418111754}},{"position":{"x":43,"y":181,"z":-469},"speed":"0.3","num":6,"length":221.77916944564473,"step":739,"move":{"x":0.2598105548037889,"y":-0.0013531799729364006,"z":-0.15020297699594046}},{"position":{"x":235,"y":180,"z":-580},"speed":"0.2","num":7,"length":277.34815665513264,"step":1387,"move":{"x":-0.005046863734679163,"y":0.008651766402307137,"z":-0.19971160778658975}},{"position":{"x":228,"y":192,"z":-857},"speed":"0.3","num":8,"length":384.2134823246056,"step":1281,"move":{"x":-0.2997658079625293,"y":-0.00624512099921936,"z":-0.0078064012490242}},{"position":{"x":-156,"y":184,"z":-867},"speed":"0.3","num":9,"length":263.0247136677464,"step":877,"move":{"x":-0.026225769669327253,"y":-0.0034207525655644243,"z":0.29874572405929306}},{"position":{"x":-179,"y":181,"z":-605},"speed":"0.3","num":10,"length":250.24987512484398,"step":834,"move":{"x":0.2637889688249401,"y":0.009592326139088728,"z":0.14268585131894485}},{"position":{"x":41,"y":189,"z":-486},"speed":"0.4","num":11,"length":211.00236965494014,"step":528,"move":{"x":0.03787878787878788,"y":-0.03977272727272727,"z":0.3958333333333333}},{"position":{"x":61,"y":168,"z":-277},"speed":"0.3","num":12,"length":99.443451267542,"step":331,"move":{"x":-0.015105740181268883,"y":0.1268882175226586,"z":0.2719033232628399}},{"position":{"x":56,"y":210,"z":-187},"speed":"0.2","num":13,"length":419.2636402074475,"step":2096,"move":{"x":0.006679389312977099,"y":0.002385496183206107,"z":0.19990458015267176}},{"position":{"x":70,"y":215,"z":232},"speed":"0.4","num":14,"length":91.11531155629113,"step":228,"move":{"x":-0.06578947368421052,"y":-0.2236842105263158,"z":0.32456140350877194}},{"position":{"x":55,"y":164,"z":306},"speed":"0.3","num":15,"length":80.64738061462381,"step":269,"move":{"x":0.14869888475836432,"y":0.007434944237918215,"z":0.26022304832713755}}];
		        
	  	$scope.vrData = Lemon.pathList = pathList;


	}

	$scope.tempInterval = $interval(function(){
		console.log('test');
	    	if((typeof Lemon != 'undefined') && (typeof objects != 'undefined')){
			    $scope.init();
			    $interval.cancel($scope.tempInterval);
	    	}

	},100)
})
/**
 * ------------------------------------------------------------------
 * 登录模块 控制器
 * ------------------------------------------------------------------
 */

  // $rootScope.bodyState = 'index';  
  //   $ocLazyLoad.load({
  //   serie: false,
  //   files: [
  //     '',

  //   ]
  // });

app.controller('login', function($scope, $rootScope , $ocLazyLoad,  authService, tools, ENV) {

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


  $scope.login = function(){

    if($scope.account.length == 0){
      tools.alert('请输入正确的帐号！');
      return null;
    }else if($scope.password.length < 3 ){
      tools.alert('密码长度过短');
      return null;
    }
    authService.login({'account':$scope.account, 'password': $scope.password})
  }
})


// 注册
// @@页面不完善，未绑定model

app.controller('register', function($scope, $rootScope, $ocLazyLoad, $state, $http, authService, ENV, tools) {

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

  $scope.register = function(){

      $http({
        method: 'POST', 
        url: ENV.baseUrl + '/user/register',
        params: { 
          'userAccount': $scope.account,
          'userName': $scope.name,
          'userPassword': $scope.password,
          'userPhone': $scope.phone,
          'userSex': '男',
          'userDetail': '这个人还没写简介',
          'userPasswordQuestion': '答案是12345',
          'userPasswordAnswer': '12345'
          // 'userSex': $scope.sex,
          // 'userDetail': $scope.detail,
          // 'userPasswordQuestion': $scope.question,
          // 'userPasswordAnswer': $scope.answer
        }
      }).
      success(function(data, status, headers, config) {
        tools.alert('注册成功！请登陆');
        $state.go('main.login');
      }).
      error(function(data, status, headers, config) {
        tools.alert('注册失败，请稍后重试');
      });
  }

})


// @@忘记密码，页面未完成
app.controller('forget', function($scope, $rootScope, $interval, $http, $state, tools) {

  $rootScope.stepNum = 1;
})


app.controller('forget_step1', function($scope, $rootScope, $interval, $http, $state, ENV, tools) {

    $rootScope.phoneNum = '';
    $rootScope.codeContent = '';
    $scope.codeText = '获取动态密码';
    $scope.codeState = false;
    $scope.getCode = function() {

      if ($scope.codeState == true) {return null;}
      if($scope.phoneNum.length !=11){
        tools.alert('手机号码长度为11位数');
        return null;
      }
      $http({
          method: 'POST', 
          url: ENV.baseUrl + '/users/captcha',
          params: {
            'operation': 'reset',
            'captcha[dial_code]': 86,
            'captcha[cellphone]': $scope.phoneNum
          }
        })
        .success(function(data) {
          console.log(data);
      })

      $scope.codeText = 59;
      $scope.codeState = true;
      var timepromise = null;
      timepromise = $interval(function() {

        if ($scope.codeText>1) {
          $scope.codeText--;
        }else {
          $scope.codeText = '获取动态密码';
          $scope.codeState = false;
          timepromise = null;
        }
      },1000);
    }

    $scope.nextPage = function(){

        if($scope.phoneNum.length !=11){
          tools.alert('手机号码长度为11位数');
          return null;
        }
        if($scope.codeContent.length == 6){
          $rootScope.phoneNum  = $scope.phoneNum;
          $rootScope.codeContent = $scope.codeContent;
          $rootScope.stepNum = 2;
          $state.go('forgetPassword.step2');
        }else{
          console.log($scope.codeContent.length );
          tools.alert('验证码长度不正确，请重新输入');
          return null;
        }
      }

})

app.controller('forget_step2', function($scope, $rootScope, $interval, $http, $state, ENV, tools) {

  $scope.lastPage = function(){

       if($scope.newPassword.length<6) { tools.alert('密码长度小于六位！'); return null; }
       if($scope.newPassword == $scope.confirmPassword){
         $http({
              method: 'POST', 
              url: ENV.baseUrl + '/users/reset',
              params: {
                'captcha': $rootScope.codeContent,
                'user[dial_code]': 86,
                'user[cellphone]': $rootScope.phoneNum ,
                'user[password]': $scope.newPassword
              }
            })
            .success(function(data) {
              tools.alert('重置密码成功');
              $state.go('forgetPassword.step3');
          })
       }else{
        tools.alert('两次输入密码不一致');
        return null;
       }
    }
})

app.controller('forget_step3', function($scope, $interval, $state) {
  
    $scope.timeNum = 5;
    timepromise = $interval(function() {
      if ($scope.timeNum>1) {
        $scope.timeNum--;
      }else {
        $state.go('login');
        timepromise = null;
      }
    },1000);
})


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
			'userId': $rootScope.USER_ID
		}
	})
	.success(function(data, status, headers, config) {

		$scope.timeline = data.activity;
		$scope.totalPage = data.totalPage;
		$scope.nowPage = data.nowPage;
	});
		

	// 发表动态
	$scope.addActivity = function(){

		tools.prompt('请输入动态', function(content){

			$http({
				method: 'POST', 
				url: ENV.baseUrl + '/user/addActivity',
				params: { 
					'content': content ,
					'type': 1
				}
			})
			.success(function(data, status, headers, config) {

				tools.msg('发表动态成功')
			});
        })

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

	// 获取start作品列表
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


// 关注作品列表
app.controller('collect', function($scope, $rootScope, $state, $http, tools, ENV) {
  
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
		url: ENV.baseUrl + '/product/getStartProductList',
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