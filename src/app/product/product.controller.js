/**
 * ------------------------------------------------------------------
 * 管理员模块 控制器
 * ------------------------------------------------------------------
 */


app.controller('operate', function($scope, $rootScope, $state, $http, $ocLazyLoad, tools, ENV, Upload) {

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

    console.log('et');
    // 创建作品
    $scope.creatProduct = function(){

	    Lemon.layer.prompt({
          title: '请输入作品标题',
          formType: 2 //prompt风格，支持0-2
        }, function(name){

            $http({
		      method: 'POST', 
		      url: ENV.baseUrl + '/product/addProduct',
		      params: { 
		        'productTitle': name,
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
        });
    }

    // 更新作品
    $scope.updateProduct = function(){

    	if($scope.currentProductId == 0){
    		tools.alert('请先在线保存');
    	}
    	$scope.currentProductId
        tools.msg('上传数据中，请稍等');
        $scope.addProductData($scope.currentProductId, Lemon.getSystemModel(), 1);
        $scope.addProductFileList($scope.currentProductId, Lemon.getUploadFileModel());
    }


    $scope.uploadPdf = function(files){

    	if(files.length == 0){
          return null;
        }

        // 遍历文件列表检查文件后缀
        angular.forEach(files, function(file) {

          var reg =/[^\\\/]*[\\\/]+/g;  //匹配文件的名称和后缀的正则表达式
          var name = file.name.replace(reg, '');
          var postfix = /\.[^\.]+$/.exec(name);//获取文件的后缀 例如： .js
          postfix = postfix[0].toLowerCase(); //后缀转换成小写

          if(postfix != '.pdf'){
              tools.alert('检测到非pdf文件！')
          }
        });
        
	     tempData=  { 
          'productId': $scope.currentProductId,
          'pdfFile': files[0]
        }
		$http({
		　　 method: 'POST',
		　　 url: ENV.baseUrl + '/product/addDocument',
		  data: tempData,
		  headers: {
		    'Content-Type': undefined
		  },
		  transformRequest: function(data) {
		    var formData = new FormData();
		    formData.append('productId', data.productId);
		    formData.append('pdfFile', data.pdfFile);
		    return formData;
		  },
		  
		})
	    .success(function(data, status, headers, config) {

	        tools.msg('上传pdf成功');
	    });
    }

    // 添加作品json数据
    $scope.addProductData = function(productId,data,isNew){

    	var tempIsNew = isNew ? isNew : 0;

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

	    	if( typeof temp.list != 'undefined'){
	    		Lemon.recoverSystemModel(temp.list);
	    	}else if(typeof temp.start != 'undefined'){
	    		Lemon.load3dComment(temp);
	    	}
	    	
	        tools.msg('操作成功');
	    });
    }


    // 获取file数据
    // $scope.getFile = function(){

	   //  $http({
	   //    method: 'POST', 
	   //    url: ENV.baseUrl + '/product/getJson',
	   //    params: { 
	   //      'dataId': 'test'

	   //    }
	   //  })
	   //  .success(function(data, status, headers, config) {

	   //      tools.msg('操作成功');
	   //  });
    // }


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

	    	$scope.commentList = data.comment;

	    	$scope.commentTotalpage = data.totalpage;
	    	$scope.commnetNowpage = data.nowpage;
	        tools.msg('操作成功');
	    });
    }

    // 添加作品json数据
    $scope.addProductData = function(productId,data,isNew){

    	var tempIsNew = isNew ? isNew : 0;

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

    // 添加3d评论
    $scope.add3dComment = function(data, type){

        control.object = undefined;
        control.visible = false;
        if(!Lemon.commentClickNum){

            Lemon.layer.prompt({
              title: '请输入评论内容',
              formType: 2 //prompt风格，支持0-2
            }, function(name){
                // 添加评论球
                Lemon.addCommentBox(name);
            });
        }else if(Lemon.commentClickNum == 1){
            // 设置箭头指向位置
            Lemon.setCommentArrow();

        }else if(Lemon.commentClickNum == 2){
            // 创建3d评论
             var tempData = Lemon.creat3dComment();
             $scope.addProductData($scope.productId,tempData);
        }
    }

    // 添加普通评论
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

		    	$scope.getCommentList();
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

  /**
   * pdf展示控制
   * ------------------------------------------------------------------
   */
    // pdf显示状态定义
    $scope.pdfstate = false;
    // pdf地址定义
    $scope.url = null;
    // pdf显示状态修改
    $scope.showpdf = function(type, file){
      if(type == 2){$scope.pdfstate = true; return null }
      if(type == 0){

        $scope.pdfstate = false;
      }else{


        $ocLazyLoad.load({
          serie: true,
          files: [
            '/assets/libs/pdf/viewer/viewer.js'
          ]
        });

        console.log(ENV.baseUrl+file)
        DEFAULT_URL = ENV.baseUrl+file;
        webViewerLoad();
        $scope.pdfstate = true;

      }
    }
})


// vr模式
app.controller('vr', function($scope, $rootScope, $interval, $state, $http, $rootScope, $ocLazyLoad,  authService, tools, ENV) {
	
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

	  		$scope.vrData = Lemon.pathList = JSON.parse(data.vr.vrContent);
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

	    	var temp = JSON.parse(data.json);

	    	if( typeof temp.list != 'undefined'){
	    		Lemon.recoverSystemModel(temp.list);
	    	}else if(typeof temp.start != 'undefined'){
	    		// vr模式不显示3d评论
	    		// Lemon.load3dComment(temp);
	    	}


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


})



// 测试vr
app.controller('vrTest', function($scope, $rootScope, $interval, $state, $http, $rootScope, $ocLazyLoad,  authService, tools, ENV) {
	
	$rootScope.bodyState = 'operate'; 
    $ocLazyLoad.load({
	  serie: true,
	  files: [
	    '/assets/js/require.js',
	    '/assets/js/vr.js'
	  ]
	});



    $scope.init =function(){
	    
		$.get("/assets/js/three/demo0.lem3d", [], function(data){

		    Lemon.recoverSystemModel(JSON.parse(data));
		});

		var pathList= [{"position":{"x":95,"y":166,"z":376},"speed":"0.3","num":1,"length":68.24221567329127,"step":227,"move":{"x":-0.13215859030837004,"y":0.02643171806167401,"z":-0.2687224669603524}},{"position":{"x":65,"y":172,"z":315},"speed":"0.2","num":2,"length":96.78842906050289,"step":484,"move":{"x":0.012396694214876033,"y":0.09090909090909091,"z":-0.17768595041322313}},{"position":{"x":71,"y":216,"z":229},"speed":"0.4","num":3,"length":409.0305612053945,"step":1023,"move":{"x":-0.004887585532746823,"y":0,"z":-0.3998044965786901}},{"position":{"x":66,"y":216,"z":-180},"speed":"0.3","num":4,"length":93.4826187052973,"step":312,"move":{"x":0.003205128205128205,"y":-0.13782051282051283,"z":-0.266025641025641}},{"position":{"x":67,"y":173,"z":-263},"speed":"0.2","num":5,"length":207.5475849052453,"step":1038,"move":{"x":-0.023121387283236993,"y":0.007707129094412331,"z":-0.19845857418111754}},{"position":{"x":43,"y":181,"z":-469},"speed":"0.3","num":6,"length":221.77916944564473,"step":739,"move":{"x":0.2598105548037889,"y":-0.0013531799729364006,"z":-0.15020297699594046}},{"position":{"x":235,"y":180,"z":-580},"speed":"0.2","num":7,"length":277.34815665513264,"step":1387,"move":{"x":-0.005046863734679163,"y":0.008651766402307137,"z":-0.19971160778658975}},{"position":{"x":228,"y":192,"z":-857},"speed":"0.3","num":8,"length":384.2134823246056,"step":1281,"move":{"x":-0.2997658079625293,"y":-0.00624512099921936,"z":-0.0078064012490242}},{"position":{"x":-156,"y":184,"z":-867},"speed":"0.3","num":9,"length":263.0247136677464,"step":877,"move":{"x":-0.026225769669327253,"y":-0.0034207525655644243,"z":0.29874572405929306}},{"position":{"x":-179,"y":181,"z":-605},"speed":"0.3","num":10,"length":250.24987512484398,"step":834,"move":{"x":0.2637889688249401,"y":0.009592326139088728,"z":0.14268585131894485}},{"position":{"x":41,"y":189,"z":-486},"speed":"0.4","num":11,"length":211.00236965494014,"step":528,"move":{"x":0.03787878787878788,"y":-0.03977272727272727,"z":0.3958333333333333}},{"position":{"x":61,"y":168,"z":-277},"speed":"0.3","num":12,"length":99.443451267542,"step":331,"move":{"x":-0.015105740181268883,"y":0.1268882175226586,"z":0.2719033232628399}},{"position":{"x":56,"y":210,"z":-187},"speed":"0.2","num":13,"length":419.2636402074475,"step":2096,"move":{"x":0.006679389312977099,"y":0.002385496183206107,"z":0.19990458015267176}},{"position":{"x":70,"y":215,"z":232},"speed":"0.4","num":14,"length":91.11531155629113,"step":228,"move":{"x":-0.06578947368421052,"y":-0.2236842105263158,"z":0.32456140350877194}},{"position":{"x":55,"y":164,"z":306},"speed":"0.3","num":15,"length":80.64738061462381,"step":269,"move":{"x":0.14869888475836432,"y":0.007434944237918215,"z":0.26022304832713755}}];
		        
	  	$scope.vrData = Lemon.pathList = pathList;


	}

	$scope.tempInterval = $interval(function(){
		console.log('test');
	    	if((typeof Lemon != 'undefined') && (typeof objects != 'undefined')){
			    $scope.init();
			    $interval.cancel($scope.tempInterval);
	    	}

	},100)
})