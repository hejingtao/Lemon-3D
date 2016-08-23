
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
  function($rootScope, $state,  $localStorage, authService, tools) {

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
    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams, options){ 
        if(toState.name == 'login'){
          return null;
        }
        // if($rootScope.loginState == false && (toState.name.indexOf('user') != -1)){
        //   event.preventDefault();
        //   tools.alert('您尚未登陆')
        //   $state.go('login'); 
        //   // console.log($rootScope.loginState);
        // }
        // console.log(fromState);
        // console.log(toState);
    })


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


