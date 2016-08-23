/**
 * ------------------------------------------------------------------
 * 管理员模块 控制器
 * ------------------------------------------------------------------
 */


app.controller('operate', function($scope, $rootScope, $state, $http, $ocLazyLoad, tools, ENV) {

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
	        $scope.addProductFileList($scope.product.productId, Lemon.getUploadFileModel());

	    });


    }

    // 添加作品json数据
    $scope.addProductData = function(productId,data,isNew){

    	var tempIsNew = isNew ? isNew : 0;

	    // $http({
	    //   method: 'POST', 
	    //   url: ENV.baseUrl + '/product/addProductData',

	    //   params: { 
	    //     'productId': productId,
	    //     'dataContent': data,
	    //     'isNew':  tempIsNew // 1为创建新版本
	    //   }
	    // })
	    // .success(function(data, status, headers, config) {

	    //     tools.msg('上传数据成功');
	    // });


		   tempData=  { 
	        'productId': productId,
	        'dataContent': data,
	        'isNew':  tempIsNew // 1为创建新版本
	      }
		$http({
		　　 method: 'POST',
		　　 url: ENV.baseUrl + '/product/addProductData',
		  data: tempData,
		  headers: {
		    'Content-Type': undefined
		  },
		  transformRequest: function(data) {
		    var formData = new FormData();
		    formData.append('productId', data.productId);
		    formData.append('dataContent', JSON.stringify(data.dataContent));
		    formData.append('isNew', data.isNew);
		    return formData;
		  },
		  
		})
	    .success(function(data, status, headers, config) {

	        tools.msg('上传数据成功');
	    });
    }

    // 添加作品file数据
    $scope.addProductFileList = function(productId, dataList, isNew){

    	var tempIsNew = isNew ? isNew : 0;
    	var currentList = dataList.list;



    	for(var i=0;i<currentList.length;i++){
			   tempData=  {
			    'productId': productId,
			    'dataFile': currentList[i].file,
			    'isNew':  tempIsNew // 1为创建新版本
			  }
			$http({
			　　 method: 'POST',
			　　 url: ENV.baseUrl + '/product/addProductFile',
			  data: tempData,
			  headers: {
			    'Content-Type': undefined
			  },
			  transformRequest: function(data) {
			    var formData = new FormData();
			    formData.append('productId', data.productId);
			    formData.append('dataFile', data.dataFile);
			    formData.append('isNew', data.isNew);
			    return formData;
			  },
			  
			})
		    .success(function(data, status, headers, config) {

		        tools.msg('上传数据成功');
		    });
    	}

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






// 展示作品
app.controller('product', function($scope, $rootScope, $interval, $state, $http, $ocLazyLoad, tools, ENV) {
	
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

    //stupid 
    // var tempStatus = true;
    // while(tempStatus){
    // 	setTimeout(function(){
    // 		if(typeof Lemon != 'undefined'){
		  //   	tempStatus = false;
		  //   }
    // 	},50)
	    
    // }
    // 
   
    $scope.init =function(){
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
	        var tempJsonList = $scope.productData.currentData.json;
	        var tempFileList = $scope.productData.currentData.file;

	        for(var i=0;i<tempJsonList.length;i++){

				$scope.recoverJson(tempJsonList[i]);
	        }

	        for(var i=0;i<tempFileList.length;i++){

	          var value = tempFileList[i];
		      var reg = /[^\\\/]*[\\\/]+/g; //匹配文件的名称和后缀的正则表达式
		      var name = value.replace(reg, '');
		      var postfix = /\.[^\.]+/.exec(name);//获取文件的后缀 例如： .js
		      postfix = postfix[0].toLowerCase(); //后缀转换成小写

				$.get(ENV.baseUrl+ tempFileList[i], [], function(data){

				    var oMyBlob = new Blob([data], { "type" : "text/plain" });
				    Lemon.loadModel(postfix, oMyBlob);
				});
	        }
	    });

	    // 自动获取评论数据
	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getProductCommentList',
	      params: { 
	        'productId': $scope.productId,
	        'page': 0,
	        'size': 10

	      }
	    })
	    .success(function(data, status, headers, config) {

	    	$scope.commentList = data.comment;

	    	$scope.commentTotalpage = data.totalpage;
	    	$scope.commnetNowpage = data.nowpage;
	        tools.msg('操作成功');
	    });
	}

	$scope.tempInterval = $interval(function(){
		console.log('test');
	    	if(typeof Lemon != 'undefined'){
			    $scope.init();
			    $interval.cancel($scope.tempInterval);
	    	}

	},100)
	


    // 获取json数据
    $scope.recoverJson = function(id){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getJson',
	      params: { 
	        'dataId': id

	      }
	    })
	    .success(function(data, status, headers, config) {
	    	var temp = JSON.parse(data.json);
	    	Lemon.recoverSystemModel(temp.list);
	        tools.msg('操作成功');
	    });
    }


    // 获取file数据
    $scope.getFile = function(){

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


    // 获取评论列表
    $scope.getCommentList = function(){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getProductCommentList',
	      params: { 
	        'productId': $scope.productId,
	        'page': 0,
	        'size': 10

	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('操作成功');
	    });
    }


    // 添加评论
    $scope.addComment = function(data, type){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/addComment',
	      params: { 
	        'productId': $scope.productId,
	        'type': type,  // 1为普通评论，2为3D评论
	        'content': data

	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('操作成功');
	    });
    }

    $scope.addCommonComment = function(){

    	tools.prompt('请输入评论内容',function(data){

		    $http({
		      method: 'POST', 
		      url: ENV.baseUrl + '/product/addComment',
		      params: { 
		        'productId': $scope.productId,
		        'type': 1,  // 1为普通评论，2为3D评论
		        'content': data

		      }
		    })
		    .success(function(data, status, headers, config) {

		        tools.msg('操作成功');
		    });
    	})
    }


    // fork
    $scope.fork = function(){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/forkProduct',
	      params: { 
	        'productId': $scope.productId
	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('fork成功');
	    });
    }

    // start
    $scope.start = function(){

	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/startProduct',
	      params: { 
	        'productId': $scope.productId,
	        'type': 1   //1收藏 0取消
	      }
	    })
	    .success(function(data, status, headers, config) {

	        tools.msg('start成功');
	    });
    }
})



// vr模式
app.controller('vr', function($scope, $rootScope, $timeout, $state, $http, $rootScope, $ocLazyLoad,  authService, tools, ENV) {
	
  	if($state.params.productId== null){
  		tools.alert('错误的作品id!');
  		return null;
  	}else{
  		$scope.productId = $state.params.productId;
  	}

	$rootScope.bodyState = 'operate'; 
    $ocLazyLoad.load({
	  serie: true,
	  files: [
	    '/assets/js/require.js',
	    '/assets/js/vr.js'
	  ]
	});



    $scope.init =function(){
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
	        var tempJsonList = $scope.productData.currentData.json;
	        var tempFileList = $scope.productData.currentData.file;

	        for(var i=0;i<tempJsonList.length;i++){

				$scope.recoverJson(tempJsonList[i]);
	        }

	        for(var i=0;i<tempFileList.length;i++){

	          var value = tempFileList[i];
		      var reg = /[^\\\/]*[\\\/]+/g; //匹配文件的名称和后缀的正则表达式
		      var name = value.replace(reg, '');
		      var postfix = /\.[^\.]+/.exec(name);//获取文件的后缀 例如： .js
		      postfix = postfix[0].toLowerCase(); //后缀转换成小写

				$.get(ENV.baseUrl+ tempFileList[i], [], function(data){

				    var oMyBlob = new Blob([data], { "type" : "text/plain" });
				    Lemon.loadModel(postfix, oMyBlob);
				});
	        }
	    });

	    // vr数据
	    $http({
	      method: 'POST', 
	      url: ENV.baseUrl + '/product/getVr',
	      params: { 
	        'productId': $scope.productId
	      }
	    })
	    .success(function(data, status, headers, config) {
	  		$scope.vrData = data.vr.vrContent;
	        tools.msg('操作成功');
	    });
	}

	$scope.tempInterval = $interval(function(){
		console.log('test');
	    	if(typeof Lemon != 'undefined'){
			    $scope.init();
			    $interval.cancel($scope.tempInterval);
	    	}

	},100)
	
	


})



// 测试vr
app.controller('vrTest', function($scope, $rootScope, $timeout, $state, $http, $rootScope, $ocLazyLoad,  authService, tools, ENV) {
	
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