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

