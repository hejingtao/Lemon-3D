/**
 * ------------------------------------------------------------------
 * app 路由模块，前端路由定义，使用uiRouter
 * ------------------------------------------------------------------
 */

angular.module('Lemon3D.router',['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  /**
   * 登录模块
   * ------------------------------------------------------------------
   */
  // 登录界面
  .state('login', {
    url: '/login',
    views: {
        "main": {
          templateUrl: 'login/login.html',
          controller: 'login'
        }
      }   
  })
  // 忘记密码界面
  .state('forgetPassword', {
    url: '/forgetPassword',
    views: {
        "main": {
          templateUrl: 'login/forgetPassword.html',
          controller: 'forget'
        }
      }   
  })
  // 忘记密码界面 子界面
  .state('forgetPassword.step1', {
    url: '/step1',
    views: {
        "forget-step@forgetPassword": {
          templateUrl: 'login/template/forgetPassword-step1.html',
          controller: 'forget_step1'
        }
      }   
  })
  // 忘记密码界面 子界面
  .state('forgetPassword.step2', {
    url: '/step2',
    views: {
        "forget-step@forgetPassword": {
          templateUrl: 'login/template/forgetPassword-step2.html',
          controller: 'forget_step2'
        }
      }   
  })
  // 忘记密码界面 子界面
  .state('forgetPassword.step3', {
    url: '/step3',
    views: {
        "forget-step@forgetPassword": {
          templateUrl: 'login/template/forgetPassword-step3.html',
          controller: 'forget_step3'
        }
      }   
  })

  /**
   * user模块
   * ------------------------------------------------------------------
   */
  // 用户主界面
  .state('user', {
    url: '/user',
    views: {
        "main": {
          templateUrl: 'user/user.html',
          controller: 'user'
        }
      }   
  })



  $urlRouterProvider.otherwise(function($injector, $location){
        console.log($injector);
        console.log($location.url());
    })
  ;
})











