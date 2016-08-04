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
          // controller: 'login'
        }
      }   
  })
  // 忘记密码界面
  // .state('register', {
  //   url: '/register',
  //   views: {
  //       "main": {
  //         templateUrl: 'login/register.html',
  //         controller: 'register'
  //       }
  //     }   
  // })


  /**
   * index模块
   * ------------------------------------------------------------------
   */
  // 首页
  .state('index', {
    url: '/',
    views: {
        "main": {
          templateUrl: 'index/index.html',
          controller: 'index'
        }
      }   
  })
  // 热门排行
  // .state('popular', {
  //   url: '/',
  //   views: {
  //       "main": {
  //         templateUrl: 'index/popular.html',
  //         controller: 'popular'
  //       }
  //     }   
  // })


  /**
   * user模块
   * ------------------------------------------------------------------
   */
  // 用户主界面
  // .state('userCentre', {
  //   url: '/userCentre',
  //   views: {
  //       "main": {
  //         templateUrl: 'user/userCentre.html',
  //         controller: 'userCentre'
  //       }
  //     }   
  // })
  // // 关注列表
  // .state('userFollowing', {
  //   url: '/userFollowing',
  //   views: {
  //       "main": {
  //         templateUrl: 'user/userFollowing.html',
  //         controller: 'userFollowing'
  //       }
  //     }   
  // })
  // // 私信中心
  // .state('userMessage', {
  //   url: '/userMessage',
  //   views: {
  //       "main": {
  //         templateUrl: 'user/userMessage.html',
  //         controller: 'userMessage'
  //       }
  //     }   
  // })
  // // 私信中心
  // .state('productList', {
  //   url: '/productList',
  //   views: {
  //       "main": {
  //         templateUrl: 'user/productList.html',
  //         controller: 'productList'
  //       }
  //     }   
  // })


  /**
   * product模块
   * ------------------------------------------------------------------
   */
  // 编辑作品
  .state('operate', {
    url: '/operate',
    views: {
        "main": {
          templateUrl: 'product/operate.html',
          controller: 'operate'
        }
      }   
  })


  /**
   * 社区模块
   * ------------------------------------------------------------------
   */
  // 
  // .state('community', {
  //   url: '/community',
  //   views: {
  //       "main": {
  //         templateUrl: 'community/community.html',
  //         controller: 'community'
  //       }
  //     }   
  // })


  $urlRouterProvider.otherwise(function($injector, $location){
        console.log($injector);
        console.log($location.url());
    })
  ;
})











