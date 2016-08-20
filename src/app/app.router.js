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
  // 关注列表
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
    url: '/productList:userId',
    views: {
        "contain@main": {
          templateUrl: 'user/productList.html',
          controller: 'productList'
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
    views: {
        "page": {
          templateUrl: 'product/operate.html',
          controller: 'operate'
        }
      }   
  })
  // 作品展示
  .state('product', {
    url: '/product',
    views: {
        "page": {
          templateUrl: 'product/product.html',
          controller: 'product'
        }
      }   
  })
  // test
  .state('vr', {
    url: '/vr',
    views: {
        "page": {
          templateUrl: 'product/vr.html',
          controller: 'vr'
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
    url: '/post',
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











