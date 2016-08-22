/**
 * ------------------------------------------------------------------
 * 管理员模块 控制器
 * ------------------------------------------------------------------
 */


app.controller('operate', function($scope, $rootScope, $timeout, $state, $http, $rootScope, $ocLazyLoad,  authService, tools, ENV) {

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

    // 创建作品
    $scope.creatProduct = function(){
	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/addProduct',
	      params: { 
	        'productTitle': 'test',
	        'productDetails': 'test', // 1代表json，0代表文件
	        'productStatus': 1
	      }
	    })
	    .success(function(data, status, headers, config) {
	    	$scope.product = data.product;
	    	$scope.currentProductId = $scope.product.productId;
	        tools.msg('新建作品成功。上传数据中，请稍等');
	        $scope.addProductData($scope.product.productId, Lemon.getSystemModel());
	    });


    }

    // 添加作品json数据
    $scope.addProductData = function(productId,data,isNew){

    	var tempIsNew = isNew ? isNew : 0;

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/addProductData',
	      params: { 
	        'productId': productId,
	        'dataContent': data,
	        'isNew':  tempIsNew // 1为创建新版本
	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('上传数据成功');
	    });
    }

    // 添加作品file数据
    $scope.addProductFile = function(productId, data,isNew){

    	var tempIsNew = isNew ? isNew : 0;
		$http({
		　　 method: 'POST',
		　　 url: ENV.baseUrl + '/product/addProductFile',
		  data: data,
		  headers: {
		    'Content-Type': undefined
		  },
		  transformRequest: function(data) {
		    var formData = new FormData();
		    formData.append('productId', data.productId);
		    formData.append('dataFile', data.data);
		    formData.append('isNew', data.isNew);
		    return formData;
		  },
		  data: {
		    'productId': productId,
		    'dataFile': data,
		    'isNew':  tempIsNew // 1为创建新版本
		  }
		})
	    .success(function(data, status, headers, config) {

	        tools.msg('上传数据成功');
	    });
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


app.controller('product', function($scope, $rootScope, $timeout, $state, $http, $rootScope, $ocLazyLoad,  authService, tools, ENV) {
	
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

    });



    // 添加评论
    $scope.addComment = function(){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/addComment',
	      params: { 
	        'productId': 'test',
	        'type': 1,  // 1为普通评论，2为3D评论
	        'content': 1

	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('操作成功');
	    });
    }

    // 获取评论列表
    $scope.getCommentList = function(){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getProductCommentList',
	      params: { 
	        'productId': 'test',
	        'page': 1,
	        'size': 1

	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('操作成功');
	    });
    }



    // 获取json数据
    $scope.getJson = function(){

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


    // fork
    $scope.fork = function(){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/forkProduct',
	      params: { 
	        'productId': 'test'
	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('操作成功');
	    });
    }

    // start
    $scope.start = function(){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/startProduct',
	      params: { 
	        'productId': 'test',
	        'type': 1   //1收藏 0取消
	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('操作成功');
	    });
    }
})




app.controller('vr', function($scope, $rootScope, $timeout, $state, $http, $rootScope, $ocLazyLoad,  authService, tools, ENV) {
	
	$rootScope.bodyState = 'operate'; 
    $ocLazyLoad.load({
	  serie: true,
	  files: [
	    '/assets/js/require.js',
	    '/assets/js/vr.js'
	  ]
	});

    // 获取vr数据
    $scope.getVrData = function(){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getVr',
	      params: { 
	        'productId': 'test'
	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('操作成功');
	    });
    }



})