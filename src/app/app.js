
var app = angular.module('Lemon3D', [
  
  'ngAnimate', //动画
  'ngStorage', //本地存储

  'Lemon3D.auth', //权限控制
  'Lemon3D.router', //路由定义
  'Lemon3D.partials', //页面组件
  'Lemon3D.service',
  'Lemon3D.directive'
  ]);


app.run(
  function($rootScope, $state,  $localStorage, authService, tools) {

    // 绑定$localStorage至$storage中
    $rootScope.$storage = $localStorage;
    // 身份切换
    // 是否需要选择
    $rootScope.isNeedChoose = 0;

    // 初始化时判断是否有token存在，设置登陆状态
    if($localStorage.isAuth == true){
      // 登陆状态
      $rootScope.loginState = true;
      // authtoken
      $rootScope.authtoken = $localStorage.authtoken;
      // 用户角色
      $rootScope.role = $localStorage.role;
      // 用户信息
      $rootScope.USER_NAME = $localStorage.USER_NAME;
      $rootScope.USER_JOB = $localStorage.USER_JOB;
      $rootScope.USER_STRUCTURE = $localStorage.USER_STRUCTURE;
      $rootScope.USER_PHONE = $localStorage.USER_PHONE;
      $rootScope.USER_EMAIL = $localStorage.USER_EMAIL; 
      $rootScope.mainOrganizationId = $localStorage.mainOrganizationId;
      
      $rootScope.identityList = $localStorage.identityList;

      $rootScope.userData = $localStorage.userData;
      console.log($rootScope.userData );
    }else{
      $state.go('login');
      $rootScope.loginState = false;
    }






    // 监听路由变化，判断是否有权限登陆
    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams, options){ 
        if(toState.name == 'login'){
          return null;
        }
        if($rootScope.loginState == false && (toState.name.indexOf('forgetPassword') == -1)){
          event.preventDefault();
          tools.alert('您尚未登陆')
          $state.go('login'); 
          // console.log($rootScope.loginState);
        }else if($rootScope.role == 'privileges' && (toState.name.indexOf('admin') == -1)){
          event.preventDefault();
          tools.alert('当前身份为管理员！请切换身份')
          $state.go('admin'); 
        }if($rootScope.role == 'employee' && (toState.name.indexOf('user') == -1)){
          event.preventDefault();
          tools.alert('当前身份为用户！请切换身份')
          $state.go('user'); 
        }
        console.log(fromState);
        console.log(toState);
    })


  }
);



app.controller('main', function($scope, $rootScope ,$timeout ,$localStorage,$state, $http, authService, tools) {


  // @method headHover 用户信息浮动展示控制部分
  // 用户信息展示状态
  $scope.headState = false;
  // 定时器存储标识
  $scope.headTimeout = null;
  /**
   * 切换用户信息浮动展示状态
   *
   * 0为hover头像姓名，展示用户信息；1为hover用户信息，消除定时器；-1为mouseleave，添加定时器（0.5s）
   *
   * @param    {number}  type     类型
   * @returns  void
   *
   * @date     2016-07-12
   * @author   hejingtao<hejigntao95@foxmail.com>
   */
  $scope.headHover = function(type){

    if(type ==0){ 
      // hover头像姓名时显示用户信息栏
      $timeout.cancel($scope.headTimeout);
      $scope.headState = true;
    }else if(type == -1){
      // 鼠标离开头像姓名或者用户信息栏时，添加定时器，500毫秒后隐藏用户信息栏
      $timeout.cancel($scope.headTimeout);
      $scope.headTimeout = $timeout(function(){
        $scope.headState = false;
      },500)
    }else if(type == 1){
      // hover用户信息栏时取消定时器
      $timeout.cancel($scope.headTimeout);
    }
  }


  // @method 修改密码
  // 修改密码显示状态变量定义 
    $scope.passwordState = false;
   /**
   * 修改密码展示状态（无选择 OR 添加部门OR 添加人员）
   *
   * 0为隐藏，1为展示
   *
   * @param    {number}  type     类型
   * @returns  void
   *
   * @date     2016-07-14
   * @author   hejingtao<hejigntao95@foxmail.com>
   */
    $scope.pswList = {
      'old': '',
      'new': '',
      'confirm': ''
    };
    $scope.showPassword = function(type){

      if(type ==1){
        $scope.passwordState = true;
      }else if(type == 0){
        $scope.passwordState = false;
      }
    }
    $scope.changePassword = function(){

      if($scope.pswList.old.length<6 || $scope.pswList.new.length<6 || $scope.pswList.confirm.length<6){
        tools.alert('密码长度小于6位数！');
        return null;
      }else if($scope.pswList.new != $scope.pswList.confirm){
        tools.alert('两次密码输入不一致，请检查');
        return null;
      }
        $http({
          method: 'POST', 
          url: ENV.baseUrl + '/users/change_pwd',
          params: { 
            'new_pwd': $scope.pswList.new ,
            'user[password]' : $scope.pswList.old
          }
        }).
        success(function(data, status, headers, config) {
          tools.alert('修改密码成功！请重新登陆！');
          authService.logout();
          $rootScope.loginState = false;
          $rootScope.$storage.isAuth = false;
          $state.go('login');
        }).
        error(function(data, status, headers, config) {

        });
    }
   /**
   * 身份切换 实现所用变量、函数
   * ------------------------------------------------------------------
   */
    // 身份切换框状态切换
    $rootScope.changeChoose = function(type){

      if($localStorage.totalLength == 1 ){
        // 只有一个身份时
        tools.alert('目前只有一个部门，无法切换')
      }else if(type >= 0){
        // 传入type参数时
        $rootScope.isNeedChoose = type;
      }else{
        // 没有传入参数时默认展示选择框，identityType为类型（是否有tab条）
        $rootScope.isNeedChoose = $localStorage.identityType;
      }
    }
     // 选择身份
    $rootScope.chooseIdentity = function(type, id){

      if(type == 1){
        // 如果为雇员
        // 赋予身份
        $rootScope.role = $localStorage.role = 'employee';
        $rootScope.roleId = $localStorage.roleId = id;
        for(var i=0;i<$rootScope.identityList.length;i++){
          // 寻找对应的身份
          if($rootScope.identityList[i].role == 'employee' &&  $rootScope.identityList[i].structure_id == id){
            $localStorage.USER_JOB = $rootScope.USER_JOB = $rootScope.identityList[i].title;
            $localStorage.USER_STRUCTURE = $rootScope.USER_STRUCTURE = $rootScope.identityList[i].structure_name;
            $localStorage.mainStructureId = $rootScope.mainStructureId =  id;
          }
        }
        // 隐藏身份切换框
        $rootScope.isNeedChoose = 0;
        // 页面跳转，强制刷新
        $state.go('user',{},{ reload: true });
        // user
      }else if(type == 2){
        // 如果为管理员
        // 赋予身份
        $rootScope.role = $localStorage.role = 'privileges';
        $rootScope.roleId = $localStorage.roleId = id;
        for(var i=0;i<$rootScope.identityList.length;i++){
          // 寻找对应的身份
          if($rootScope.identityList[i].role == 'privileges' &&  $rootScope.identityList[i].organization_id == id){
            $localStorage.USER_JOB = $rootScope.USER_JOB = '管理员';
            $localStorage.USER_STRUCTURE = $rootScope.USER_STRUCTURE = $rootScope.identityList[i].organization_name;
            $localStorage.mainOrganizationId = $rootScope.mainOrganizationId =  id;
          }
        }
        // 隐藏身份切换框
        $rootScope.isNeedChoose = 0;
        // 页面跳转，强制刷新
        $state.go('admin',{},{ reload: true });
      }
    }

    // 退出
    $scope.exit = function(){
      authService.logout();
      localStorage.clear();
      tools.alert('退出成功');
      $state.go('login');
    }
})




