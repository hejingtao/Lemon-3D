/**
 * ------------------------------------------------------------------
 * 登录模块 控制器
 * ------------------------------------------------------------------
 */
var user = function($scope, $rootScope, $stateParams, $timeout, $state, $http, $rootScope,  authService, tools, ENV){
  
  // 初始化导航栏状态
  // 侧边栏
  $scope.leftNavState = $state.params.left? $state.params.left :1;
  // 一级导航栏
  $scope.firstNavState = $state.params.first? $state.params.first :1;
  // 二级导航栏
  $scope.secondNavState = $state.params.second? $state.params.second :1;
  // 地址栏为user时自动跳转入列表页
  if($state.current.name == 'user'){
        $state.go('user.list',{'left': $scope.leftNavState, 'first': $scope.firstNavState, 'second': $scope.secondNavState })
  }
  // 导航栏跳转
  $scope.href = function(level,type){

    if(level == 1){
      $scope.leftNavState = type;
    }else if(level == 2){
      $scope.firstNavState = type;
    }else if(level == 3){
      $scope.secondNavState = type;
    }
    // 从发起流程跳转出来时，二级菜单状态为0时，自动填充二级菜单状态为1
    if($scope.secondNavState == 0){

      $state.go('user.list',{'left': $scope.leftNavState, 'first': $scope.firstNavState, 'second': 1 },{'reload': true});
    }else{
      $state.go('user.list',{'left': $scope.leftNavState, 'first': $scope.firstNavState, 'second': $scope.secondNavState })
    }
  }

  $scope.details = function(type, packageId){

     if(type == 3){
      $state.go('user.contractDetails',{'packageId': 1});
     }else{
      $state.go('user.packageDetails',{'packageId': 1});
     }
  }

  $scope.newPackage = function(type, packageId){

        $scope.secondNavState = 0;
       $state.go('user.newPackage');
  }

}


var user_newPackage = function($scope, $rootScope, $state, $http, $rootScope,  authService, tools, ENV){
  








}