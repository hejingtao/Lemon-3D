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
    if (response.status === 200 ) {
     // 将token存入localStorage
     $localStorage.authtoken = response.data.userCurrentToken; 
     console.log($localStorage.authtoken);
     // 设置授权状态
     setAuthorizationParams(true);
     $localStorage.userData = response.data.user;
     // 设置用户信息
     $localStorage.USER_ID = $rootScope.USER_ID = response.data.user.userId;
     $localStorage.USER_NAME = $rootScope.USER_NAME = response.data.user.userName;
     $localStorage.USER_PHONE = $rootScope.USER_PHONE = response.data.user.userPhone;
     $localStorage.USER_ACCOUNT = $rootScope.USER_ACCOUNT = response.data.user.userAccount;

     $state.go('index',{},{'reload': true});

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
      $state.go('index',{},{'reload': true});
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

