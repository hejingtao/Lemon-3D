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
    baseUrl: 'http://'
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

    // 分页方法，暂时无用
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
          tempLeftArr.push(tempMin);
        }
        if(tempMax<=totalPage){
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
    }
  }
})

// http拦截
.factory('httpInterceptor', [ '$q', '$injector','$rootScope',function($q, $injector, $rootScope) {  
        var httpInterceptor = {  
            request: function (config) {
              if($rootScope.$storage.authtoken != undefined){
                   config.headers['Authorization'] = 'Token token="'+$rootScope.$storage.authtoken +'"';
              }
              config.headers['Content-Type'] = 'application/json';
              config.headers['Accept'] = 'application/json';
              config.requestTimestamp = new Date().getTime();
              return config;
            },
            'responseError' : function(response) {  
                if(response.data.code == 1006){
                    layer.confirm('您是如何看待前端开发？', {
                      btn: ['重要','奇葩'] //按钮
                    }, function(){
                      layer.msg('的确很重要', {icon: 1});
                    }, function(){
                      layer.msg('也可以这样', {
                        time: 20000, //20s后自动关闭
                        btn: ['明白了', '知道了']
                      });
                    });
                }else if(response.data.code>= 1000){
                    alert(response.data.error)
                }else if (response.status == 401) {  
                    alert('未知错误［error code：401］')
                } else if (response.status === 404) {  
                    alert('未知错误［error code：404］')
                }  
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


