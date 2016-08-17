/**
 *      █╗  █╗ ███╗ ███╗  █╗  █╗█╗    █████╗
 *      ██╗██║█╬══█╗█╔═█╗ █║  █║█║    █╔═══╝
 *      █╔█╬█║█║  █║█║ ╚█╗█║  █║█║    █║    
 *      █║╚╝█║█║  █║█║  █║█║  █║█║    ████╗ 
 *      █║  █║█║  █║█║  █║█║  █║█║    █╔══╝ 
 *      █║  █║█║  █║█║ █╬╝█║  █║█║    █║    
 *      █║  █║╚███╬╝███╬╝ ╚███╬╝█████╗█████╗
 *      ╚╝  ╚╝ ╚══╝ ╚══╝   ╚══╝ ╚════╝╚════╝
 */

/**
 * ------------------------------------------------------------------
 * 其他模块
 * ------------------------------------------------------------------
 */

// 选中的模型
Lemon.SELECTED = null;

// 添加临时模型
Lemon.addTempModel = function(){

    if(Lemon.tempMeshStatus = true){
        console.log('remove tempMesh');
        Lemon.tempMeshStatus = false;
        scene.remove(Lemon.tempMesh);
    }
    console.log(Lemon.Geometry[Lemon.modelType]);
    Lemon.tempMesh = new THREE.Mesh( Lemon.Geometry[Lemon.modelType], Lemon.Material.temp() );
    Lemon.tempMesh.position.y = 10;
    Lemon.tempMeshStatus = true;
    scene.add( Lemon.tempMesh );
}
//初始化线框状态
Lemon.wireframeStatus = true;
// 初始化模型ID
Lemon.modelType = 'cube';
// 设置模型id
Lemon.setmodelType = function(id){
    Lemon.modelType = id;
}
// 控制右上栏目显示
Lemon.modelOperate = function(status){
    if(status){
        $('#operate-top-right').css('display','block');
    }else{
        $('#operate-top-right').css('display','none');
    }
}

// 评论状态定义
Lemon.commentStatus = false;
Lemon.creatCommentDiv = (function(){
    return function(){
        if(!Lemon.tempCommentDiv){
            Lemon.tempCommentDiv = document.createElement("div"); 
            Lemon.tempCommentDiv.id = "comment"; 
            document.body.appendChild(Lemon.tempCommentDiv); 
        }

        return Lemon.tempCommentDiv;
    }
})();
Lemon.hiddenCommentDiv = function(){
    if(Lemon.commentStatus == true){
        console.log('hideen comment');
        Lemon.commentDiv.style.cssText="display:none;";
        Lemon.commentStatus = false;
    }
}

/**
 *      █╗  █╗ ███╗ ███╗  █╗  █╗█╗    █████╗
 *      ██╗██║█╬══█╗█╔═█╗ █║  █║█║    █╔═══╝
 *      █╔█╬█║█║  █║█║ ╚█╗█║  █║█║    █║    
 *      █║╚╝█║█║  █║█║  █║█║  █║█║    ████╗ 
 *      █║  █║█║  █║█║  █║█║  █║█║    █╔══╝ 
 *      █║  █║█║  █║█║ █╬╝█║  █║█║    █║    
 *      █║  █║╚███╬╝███╬╝ ╚███╬╝█████╗█████╗
 *      ╚╝  ╚╝ ╚══╝ ╚══╝   ╚══╝ ╚════╝╚════╝
 */

/**
 * ------------------------------------------------------------------
 * 3D评论模块
 * ------------------------------------------------------------------
 */

// 添加评论球
Lemon.addCommentBox = function(name){

    // 清除可能残余的评论球
    for(i=0;i<objects.length;i++){
        if(objects[i].comment == "current-comment"){
             scene.remove(objects[i]);
             objects.splice(i,1);
        }
    }
    Lemon.commentContent = name;
    Lemon.setmodelType('comment');
    Lemon.addTempModel();
    Lemon.EventListener.bind('default',2);
    Lemon.EventListener.bind('model');
    Lemon.commentClickNum =1;
    layer.msg('请放置评论球到你想展示评论的位置，再点击此按钮。');
}

// 添加定位球
Lemon.setCommentArrow = function(){

    layer.msg('请放置箭头球到你想指向的位置，再点击此按钮。');
    Lemon.setmodelType('position');
    Lemon.addTempModel();
    Lemon.EventListener.bind('default',2);
    Lemon.EventListener.bind('model');
    Lemon.commentClickNum =2;
}



/**
 *      █╗  █╗ ███╗ ███╗  █╗  █╗█╗    █████╗
 *      ██╗██║█╬══█╗█╔═█╗ █║  █║█║    █╔═══╝
 *      █╔█╬█║█║  █║█║ ╚█╗█║  █║█║    █║    
 *      █║╚╝█║█║  █║█║  █║█║  █║█║    ████╗ 
 *      █║  █║█║  █║█║  █║█║  █║█║    █╔══╝ 
 *      █║  █║█║  █║█║ █╬╝█║  █║█║    █║    
 *      █║  █║╚███╬╝███╬╝ ╚███╬╝█████╗█████╗
 *      ╚╝  ╚╝ ╚══╝ ╚══╝   ╚══╝ ╚════╝╚════╝
 */

/**
 * ------------------------------------------------------------------
 * VR操作模块
 * ------------------------------------------------------------------
 */

// 控制camera移动路径
Lemon.vrPath = function(camera, pathList){

    pathList= [
        {
            'x': 10,
            'y': 10,
            'z': 10,
            'speed': 5
        },
        {
            'x': 20,
            'y': 20,
            'z': 20,
            'speed': 10
        }
    ];

    if(pathList.length <= 1){ return null};



}




/**
 *      █╗  █╗ ███╗ ███╗  █╗  █╗█╗    █████╗
 *      ██╗██║█╬══█╗█╔═█╗ █║  █║█║    █╔═══╝
 *      █╔█╬█║█║  █║█║ ╚█╗█║  █║█║    █║    
 *      █║╚╝█║█║  █║█║  █║█║  █║█║    ████╗ 
 *      █║  █║█║  █║█║  █║█║  █║█║    █╔══╝ 
 *      █║  █║█║  █║█║ █╬╝█║  █║█║    █║    
 *      █║  █║╚███╬╝███╬╝ ╚███╬╝█████╗█████╗
 *      ╚╝  ╚╝ ╚══╝ ╚══╝   ╚══╝ ╚════╝╚════╝
 */

/**
 * ------------------------------------------------------------------
 * 命令模块
 * ------------------------------------------------------------------
 */

// 命令栈
Lemon.CommandStack = {
    'redo': [],
    'undo': [],
    'maxLength': 10
};
// 命令接受者
Lemon.Command = {
    execute: function(command){

        command.execute();
        Lemon.CommandStack.undo.push(command);

        console.log(Lemon.CommandStack)
    },
    undo: function(){

        if(Lemon.CommandStack.undo.length == 0){return null};
        // 撤销
        var tempCommand = Lemon.CommandStack.undo.pop();
        tempCommand.undo();
        // 推入redo stack
        Lemon.CommandStack.redo.push(tempCommand);
        if(Lemon.CommandStack.redo.length > Lemon.CommandStack.maxLength){ Lemon.CommandStack.redo.shift() };

        console.log(Lemon.CommandStack)
    },
    redo: function(){

        if(Lemon.CommandStack.redo.length == 0){return null};
        // 重做
        var tempCommand = Lemon.CommandStack.redo.pop();
        tempCommand.execute();
        // 推入redo stack
        Lemon.CommandStack.undo.push(tempCommand);
        if(Lemon.CommandStack.undo.length > Lemon.CommandStack.maxLength){ Lemon.CommandStack.undo.shift() };

        console.log(Lemon.CommandStack)
    }
}

// 改变贴图命令
Lemon.ChangeTextureCommand = function(object,texture){

    this.currentObj = object;
    this.newTexture = texture;
    this.oldTexture = '';

    if(object.children.length != 0){
        object.children.forEach(function(e){
            if(e.material.userData.type != 'wireframe'){
                this.oldTexture = e.material.textureName? e.material.textureName: 'blank';
            }
            
        });
    }else{
        this.oldTexture = object.material.textureName? object.material.textureName: 'blank';
    }
}
Lemon.ChangeTextureCommand.prototype = {

        execute: function() {

            this.setTexture(this.newTexture);
        },
        undo: function() {

            this.setTexture(this.oldTexture);
        },

        setTexture : function(tempTexture){

            if(this.currentObj.children.length != 0){

                this.currentObj.children.forEach(function(e){
                    if(e.material.userData.type != 'wireframe'){
                        e.material = Lemon.useTexture(tempTexture);
                    }
                    
                });
            }else{
                this.currentObj.material = Lemon.useTexture(tempTexture);
            }
        }
}


// 改变颜色命令
Lemon.ChangeColorCommand = function(object,color,el){

    this.currentObj = object;
    this.newColor = color;
    this.oldColor = '';
    this.el = el;
    if(object.children.length != 0){
        object.children.forEach(function(e){
            if(e.material.userData.type != 'wireframe'){
                this.oldColor = e.material.color.getHexString();
            }
            
        });
    }else{
        this.oldColor = object.material.color.getHexString();
    }
}
Lemon.ChangeColorCommand.prototype = {

        execute: function() {

            this.setColor(this.newColor);
            $(this.el).colpickHide();
        },
        undo: function() {

            this.setColor(this.oldColor);
        },

        setColor : function(tempColor){

            $(this.el).css('background-color', '#'+tempColor);
            
            if(this.currentObj.children.length != 0){
                this.currentObj.children.forEach(function(e){
                    if(e.material.userData.type != 'wireframe'){
                        e.material.color.setHex('0x'+tempColor);
                    }
                    
                });
            }else{
                this.currentObj.material.color.setHex('0x'+tempColor);
            }
        }
}


/**
 *      █╗  █╗ ███╗ ███╗  █╗  █╗█╗    █████╗
 *      ██╗██║█╬══█╗█╔═█╗ █║  █║█║    █╔═══╝
 *      █╔█╬█║█║  █║█║ ╚█╗█║  █║█║    █║    
 *      █║╚╝█║█║  █║█║  █║█║  █║█║    ████╗ 
 *      █║  █║█║  █║█║  █║█║  █║█║    █╔══╝ 
 *      █║  █║█║  █║█║ █╬╝█║  █║█║    █║    
 *      █║  █║╚███╬╝███╬╝ ╚███╬╝█████╗█████╗
 *      ╚╝  ╚╝ ╚══╝ ╚══╝   ╚══╝ ╚════╝╚════╝
 */

/**
 * ------------------------------------------------------------------
 * 文件操作模块
 * ------------------------------------------------------------------
 */
// 用户上传文件存储列表
Lemon.uploadFileList = [];

// 获取后缀名  .xxx
Lemon.getPostfix = function(value){

      var reg = /[^\\\/]*[\\\/]+/g; //匹配文件的名称和后缀的正则表达式
      var name = value.replace(reg, '');
      var postfix = /\.[^\.]+/.exec(name);//获取文件的后缀 例如： .js
      postfix = postfix[0].toLowerCase(); //后缀转换成小写
      var text =name.substr(0,postfix['index']);//获取没有后缀的名称
      var tempResult = {
        'postfix': postfix,
        'name': text
      }

      return tempResult;
}

//保存文件
Lemon.saveFile = function (strData, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(uri);
    }
}

// 遍历获取当前系统预定义模型数据
Lemon.getSystemModel = function(){

    var saveIndex = 0;
    var tempModelList = [];
    for(var i=0;i<objects.length;i++){
        if(objects[i].able == 'false') continue;
        // object.material.color.getHexString();
        var tempMtr = {};
        tempMtr.name = objects[i].material.textureName? objects[i].material.textureName: 'blank';
        tempMtr.color =  objects[i].material.color.getHexString();

        var tempMesh = objects[i].clone();
        tempMesh.material = Lemon.Material.base();
        var tempModel = tempMesh.toJSON();

        var tempObj = {
            "geo": tempModel,
            "mtrName": tempMtr
        }
        tempModelList.push(tempObj);

        saveIndex++;
    }
    var tempResult = {
        'list': tempModelList,
        'num': saveIndex
    };
    return tempResult;
}

// 保存系统预定义模型至localStorage
Lemon.saveLocalSystemModel = function(name){

    var result = Lemon.getSystemModel();

    for(var i=0;i<result.num;i++){

        localStorage.setItem(name+"-model-"+i, JSON.stringify(result.list[i]));
    }

    localStorage.setItem(name+"-model-num", result.num);
    Lemon.layer.msg('保存成功！名称：'+name);
}


// 获取localStorage中的系统预定义模型数据
Lemon.getLocalSystemModel = function(name){

     var modelNum = localStorage.getItem(name+"-model-num");
     var tempModelList = [];

     for(var i=0;i<modelNum;i++){

        var tempModelJson = localStorage.getItem(name+"-model-"+i);

        if (tempModelJson) {
            var tempModel = JSON.parse(tempModelJson);

            tempModelList.push(tempModel);
        }
     }
     return tempModelList;
}

// 恢复localstorage中的系统预定义模型
Lemon.recoverLocalSystemModel = function(name){

     var tempModelList = Lemon.getLocalSystemModel(name);
     Lemon.recoverSystemModel(tempModelList);
     layer.msg('读取成功！名称：'+name);
}


// 渲染系统预定义模型
Lemon.recoverSystemModel = function(systemModelList){

     var modelNum = systemModelList.length;
     for(var i=0;i<modelNum;i++){

            var loadedGeometry = systemModelList[i].geo;
            var tempMtr = systemModelList[i].mtrName;

            var loader = new THREE.ObjectLoader();

            loadedMesh = loader.parse(loadedGeometry);

            loadedMesh.material =  Lemon.useTexture(tempMtr.name);
            loadedMesh.material.color.setHex('0x'+tempMtr.color);

            objects.push(loadedMesh);
            scene.add(loadedMesh);
     }
}


// 下载系统预定义模型数据
Lemon.exportModelToFile = function(name){

    if(name == ''){name="default"};

    var tempJSON =Lemon.getLocalSystemModel(name);

    var oMyBlob = new Blob([JSON.stringify(tempJSON)],{type: 'text/plain'});
    var reader = new FileReader();
    reader.onload = function(){

        var urlData = this.result;
        Lemon.saveFile(urlData, name+".lem3d");
    };
    reader.readAsDataURL(oMyBlob);
}


/**
 *      █╗  █╗ ███╗ ███╗  █╗  █╗█╗    █████╗
 *      ██╗██║█╬══█╗█╔═█╗ █║  █║█║    █╔═══╝
 *      █╔█╬█║█║  █║█║ ╚█╗█║  █║█║    █║    
 *      █║╚╝█║█║  █║█║  █║█║  █║█║    ████╗ 
 *      █║  █║█║  █║█║  █║█║  █║█║    █╔══╝ 
 *      █║  █║█║  █║█║ █╬╝█║  █║█║    █║    
 *      █║  █║╚███╬╝███╬╝ ╚███╬╝█████╗█████╗
 *      ╚╝  ╚╝ ╚══╝ ╚══╝   ╚══╝ ╚════╝╚════╝
 */

/**
 * ------------------------------------------------------------------
 * 框选模块
 * ------------------------------------------------------------------
 */

//初始化框选
Lemon.selectedInit = function(event){

    Lemon.isSelect = true; 
    var evt = window.event || arguments[0]; 
    // 鼠标初始位置
    Lemon.startX = (evt.x || evt.clientX); 
    Lemon.startY = (evt.y-50 || evt.clientY-50); 
    // 创建选择框
    Lemon.selDiv = document.createElement("div"); 
    Lemon.selDiv.style.cssText = "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;"; 
    Lemon.selDiv.id = "selectDiv"; 
    document.body.appendChild(Lemon.selDiv); 
    
    // 选择框初始定位
    Lemon.selDiv.style.left = Lemon.startX + "px"; 
    Lemon.selDiv.style.top = Lemon.startY + "px"; 
    // 鼠标位置预定义
    Lemon._x = null; 
    Lemon._y = null; 
    Lemon.clearEventBubble(evt); 
}
// 阻止冒泡
Lemon.clearEventBubble = function(evt) { 

  if (evt.stopPropagation) 
    evt.stopPropagation(); 
  else 
    evt.cancelBubble = true; 
  if (evt.preventDefault) 
    evt.preventDefault(); 
  else 
    evt.returnValue = false; 
} 
// 判断obj是否被选中
Lemon.isObjectInSelect = function(object3D){

    if(object3D.able == 'false') return false;
    // 获取控制区域宽高
    var width = $('#WebGL-output').width(), height = $(window).height() - 50;
    var widthHalf = width / 2, heightHalf = height / 2;

    // 关键算法
    var vector = new THREE.Vector3();
    var projector = new THREE.Projector();
    vector.project( camera );
    // 2D坐标
    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;
    // 简化代码名
    var top = Lemon.selectFrame.top - 50;
    var left = Lemon.selectFrame.left;
    var width = Lemon.selectFrame.width;
    var height = Lemon.selectFrame.height;
    // 判断是否在选框范围内
    if(vector.x > left && vector.x <(left+width) && vector.y >top && vector.y< (top+height)){
        return true;
    }else{
        return false;
    }

}

/**
 *      █╗  █╗ ███╗ ███╗  █╗  █╗█╗    █████╗
 *      ██╗██║█╬══█╗█╔═█╗ █║  █║█║    █╔═══╝
 *      █╔█╬█║█║  █║█║ ╚█╗█║  █║█║    █║    
 *      █║╚╝█║█║  █║█║  █║█║  █║█║    ████╗ 
 *      █║  █║█║  █║█║  █║█║  █║█║    █╔══╝ 
 *      █║  █║█║  █║█║ █╬╝█║  █║█║    █║    
 *      █║  █║╚███╬╝███╬╝ ╚███╬╝█████╗█████╗
 *      ╚╝  ╚╝ ╚══╝ ╚══╝   ╚══╝ ╚════╝╚════╝
 */

/**
 * ------------------------------------------------------------------
 * 事件模块
 * ------------------------------------------------------------------
 */

// 已经绑定的事件名，防止重复绑定
Lemon.bindList = [];
// 事件管理
Lemon.EventListener = {
	webGL: "#WebGL-output",
	add: function(event,eventName,target){

		target = arguments[2] || this.webGL;
		$(target).bind(event,Lemon.EventList[event][eventName]);
	},
	remove: function(event,eventName,target){

		target = arguments[2] || this.webGL;
		$(target).unbind(event,Lemon.EventList[event][eventName]);
	},
	bind: function(eventName,type,target){  //自动绑定拥有name值的行为


		type = arguments[1] || 1 ;
		target = arguments[2] || this.webGL;

        var tempIndex = Lemon.bindList.indexOf(eventName);
        if(type == 1){  //绑定事件时
            if( tempIndex == -1){ //bindList存在此事件则返回null
                Lemon.bindList.push(eventName);
            }else{
                return null;
            }
        }else{ //取消绑定事件时
            if(tempIndex != -1){ //bindList存在此事件则删除其
                Lemon.bindList.splice(tempIndex,1);
            }else{
                console.log('无该项');
                return null;
            }
        }

		$.each(Lemon.EventList,function(key,value){ 
			// 第一层循环遍历EventList
			$.each(Lemon.EventList[key],function(key2,value2){
				// 第二层循环遍历EventList中的行为
				if(key2 == eventName){
					// 若同名且type=1则绑定

					if(type == 1){ 
						$(target).bind(key,Lemon.EventList[key][key2]); 
					}else{ 
						// type=2时取消绑定
						$(target).unbind(key,Lemon.EventList[key][key2]);
					}
				}
			})
		})
	}
}

        // raycaster  鼠标位置指示
        // var geometry = new THREE.CylinderGeometry( 0, 2, 5, 3 );
        // geometry.translate( 0, 0, 0 );
        // geometry.rotateX( Math.PI / 2 );
        // var helper = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );



// 事件列表
Lemon.EventList={
	//鼠标移动 
	"mousemove" : {  
		default: function( event ) {

            event.preventDefault();
            
            mouse.x = ( event.clientX / $('#operate-content .left').width() ) * 2 - 1;
            mouse.y = - ( (event.clientY-50) / $('#operate-content .left').height() ) * 2 + 1;
            raycaster.setFromCamera( mouse, camera );
            var intersects = raycaster.intersectObjects( objects ,true);

            // //指示鼠标位置
            // scene.add( helper );
            // if ( intersects.length > 0){
            //     helper.position.set( 0, 0, 0 );
            //     helper.lookAt( intersects[ 0 ].face.normal );
            //     helper.position.copy( intersects[ 0 ].point );
            // }

            // 指向Model时改变鼠标手势
            if ( intersects.length > 0 && intersects[0].object.able != 'false') {
                container.style.cursor = 'pointer';
                // 判断是否指向评论球
                if(intersects[0].object.comment == 'comment'){

                    console.log('show comment');
                    Lemon.commentStatus = true;
                    var commentX = (event.x || event.clientX); 
                    var commentY = (event.y-50 || event.clientY-50); 

                    Lemon.commentDiv = Lemon.creatCommentDiv();
                    Lemon.commentDiv.style.cssText = "position:absolute;border-radius:5px;color:rgb(83,83,83);width:300px;min-height:50px;font-size:16px;line-height:20px;margin:0px;padding:5px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.8;display:fixed;"; 
                    Lemon.commentDiv.style.left = commentX+5 + "px"; 
                    Lemon.commentDiv.style.top = commentY-5 + "px"; 
                    Lemon.commentDiv.innerHTML= intersects[0].object.commentContent;
                }else if(Lemon.commentStatus == true){
                    Lemon.hiddenCommentDiv();
                }
                
            }else {
                if(Lemon.commentStatus == true){
                    Lemon.hiddenCommentDiv();
                }
                container.style.cursor = 'auto';

                
            }
        },
        model : function( event ) {

            event.preventDefault();

            mouse.x = ( event.clientX / $('#operate-content .left').width() ) * 2 - 1;
            mouse.y = - ( (event.clientY-50)  / $('#operate-content .left').height() ) * 2 + 1;
            // 将raycaster指向指定的点
            raycaster.setFromCamera( mouse, camera );
            // 根据点的位置获取相对距离
            var intersects = raycaster.intersectObjects( objects, true );
            
            // 指示鼠标位置
            // helper.position.set( 0, 0, 0 );
            // helper.lookAt( intersects[ 0 ].face.normal );
            // helper.position.copy( intersects[ 0 ].point );

            if ( intersects.length > 0 ) {
                var intersect = intersects[ 0 ];

                Lemon.tempMesh.position.copy( intersect.point ).add( intersect.face.normal );
                Lemon.tempMesh.position.divideScalar( 10 ).floor().multiplyScalar( 10 ).addScalar( 10 );
           		Lemon.tempMesh.position.y = 10;

                // 添加鼠标位置
                // scene.add( helper );
            }
            render();

        },
        selected: function(event){
                    console.log('move')
                      evt = window.event || arguments[0]; 
                      if (Lemon.isSelect) { 
                        // 显示选择框
                        if (Lemon.selDiv.style.display == "none") { 
                          Lemon.selDiv.style.display = ""; 
                        } 
                        // 获取鼠标实时位置
                        Lemon._x = (evt.x || evt.clientX) -10; 
                        Lemon._y = (evt.y-50 || evt.clientY-50)-10; 
     
                        Lemon.selectFrame.left = Math.min(Lemon._x, Lemon.startX); 
                        Lemon.selectFrame.top = Math.min(Lemon._y, Lemon.startY)+50; 

                        Lemon.selectFrame.width = Math.abs(Lemon._x - Lemon.startX); 
                        Lemon.selectFrame.height = Math.abs(Lemon._y - Lemon.startY); 

                        // 判断选择框位置
                        Lemon.selDiv.style.left = Math.min(Lemon._x, Lemon.startX) + "px"; 
                        Lemon.selDiv.style.top  = Math.min(Lemon._y, Lemon.startY)+50 + "px"; 
                        // 计算选择框长度、高度
                        Lemon.selDiv.style.width = Math.abs(Lemon._x - Lemon.startX) + "px"; 
                        Lemon.selDiv.style.height = Math.abs(Lemon._y - Lemon.startY) + "px"; 
                 
                        clearTimeout(Lemon.tempTimeout);
                        Lemon.tempTimeout = setTimeout(function(){
                            for(var i=0;i<objects.length;i++){
                                if(Lemon.isObjectInSelect(objects[i])){
                                    console.log('catch it');
                                }
                            }
                        },100)
                        
                      } 
                      Lemon.clearEventBubble(evt); 
        }
    },

    //鼠标按下
    "mousedown":{   
        default:function( event ) {

            event.preventDefault();
            // 如果按下鼠标中键或者右键，直接隐藏模型控制
            if(event.which == 3 || event.which == 2){

            	console.log('right down');
            	control.visible = false;
            	return null;
            }

            raycaster.setFromCamera( mouse, camera );
            var intersects = raycaster.intersectObjects( objects,true);

            console.log(objects);
            // 如果选中了模型
            if ( intersects.length > 0  && intersects[0].object.able != 'false') {
                Lemon.modelOperate(true);
                control.object = undefined;
                // 添加控制控件
                if(intersects[ 0 ].object.userData.parent){
                	intersects[ 0 ].object.parent.opacity = 0.7;
                	intersects[ 0 ].object.parent.transparent=true;
                    console.log('parent obj :');
                    console.log(intersects[ 0 ].object.parent);
                	intersects[ 0 ].object.parent.children.forEach(function(e){e.opacity = 0.7;e.transparent=true; console.log('forEach parent child')})
                	control.attach( intersects[ 0 ].object.parent );
                }else{
                    console.log('common obj :');
                	intersects[ 0 ].object.opacity = 0.7;
                    console.log(intersects[ 0 ].object);
                	intersects[ 0 ].object.parent.transparent=true;
                	control.attach( intersects[ 0 ].object );
                }
                Lemon.SELECTED = intersects[ 0 ].object;
                control.visible = true;
                // controls.enabled = false;
                container.style.cursor = 'move';
            }else{
                Lemon.modelOperate(false);
                control.object = undefined;
                control.visible = false;

                // 框选  --------------

                Lemon.selectedInit(event);
                Lemon.EventListener.bind("default",2);
                Lemon.EventListener.bind("selected",1,window);
                    // var isSelect = true; 
                    // var evt = window.event || arguments[0]; 
                    // // 鼠标初始位置
                    // var startX = (evt.x || evt.clientX); 
                    // var startY = (evt.y-50 || evt.clientY-50); 
                    // // 创建选择框
                    // var Lemon.selDiv = document.createElement("div"); 
                    // Lemon.selDiv.style.cssText = "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;"; 
                    // Lemon.selDiv.id = "selectDiv"; 
                    // document.body.appendChild(Lemon.selDiv); 
                    
                    // // 选择框初始定位
                    // Lemon.selDiv.style.left = startX + "px"; 
                    // Lemon.selDiv.style.top = startY + "px"; 
                    // // 鼠标位置预定义
                    // var _x = null; 
                    // var _y = null; 
                    // clearEventBubble(evt); 
                 
                    // document.onmousemove = function() { 
                    //   evt = window.event || arguments[0]; 
                    //   if (isSelect) { 
                    //     // 显示选择框
                    //     if (Lemon.selDiv.style.display == "none") { 
                    //       Lemon.selDiv.style.display = ""; 
                    //     } 
                    //     // 获取鼠标实时位置
                    //     _x = (evt.x || evt.clientX); 
                    //     _y = (evt.y-50 || evt.clientY-50); 
     
                    //     Lemon.selectFrame.left = Math.min(_x, startX); 
                    //     Lemon.selectFrame.top = Math.min(_y, startY)+50; 

                    //     Lemon.selectFrame.width = Math.abs(_x - startX); 
                    //     Lemon.selectFrame.height = Math.abs(_y - startY); 

                    //     // 判断选择框位置
                    //     Lemon.selDiv.style.left = Math.min(_x, startX) + "px"; 
                    //     Lemon.selDiv.style.top  = Math.min(_y, startY)+50 + "px"; 
                    //     // 计算选择框长度、高度
                    //     Lemon.selDiv.style.width = Math.abs(_x - startX) + "px"; 
                    //     Lemon.selDiv.style.height = Math.abs(_y - startY) + "px"; 
                 
                    //     clearTimeout(Lemon.tempTimeout);
                    //     Lemon.tempTimeout = setTimeout(function(){
                    //         for(var i=0;i<objects.length;i++){
                    //             if(isObjectInSelect(objects[i])){
                    //                 console.log('catch it');
                    //             }
                    //         }
                    //     },100)
                        
                    //   } 
                    //   clearEventBubble(evt); 
                    // } 
                 
                    // document.onmouseup = function() { 
                    //   isSelect = false; 

                    //   if (Lemon.selDiv) { 
                    //     document.body.removeChild(Lemon.selDiv); 
                    //   } 
                    //    _x = null, _y = null, Lemon.selDiv = null, startX = null, startY = null, evt = null; 
                    // } 
                // 框选  END  --------------

            }
        },
        model : function( event ) {
	                event.preventDefault();
                    // 如果按下鼠标右键，取消添加模型
	                if(event.which == 3){
	                	Lemon.EventListener.bind("model",2);
	                	Lemon.EventListener.bind("default");
                        Lemon.tempMeshStatus = false;
	                   scene.remove(Lemon.tempMesh);
	                   return null;
	               }

	               mouse.set( ( event.clientX / $('#operate-content .left').width() ) * 2 - 1, - ( (event.clientY-50) / $('#operate-content .left').height() ) * 2 + 1 );
	               raycaster.setFromCamera( mouse, camera );
	               var intersects = raycaster.intersectObjects( objects, true );
	               
	               if ( intersects.length > 0 ) {
	                // console.log(intersects);
	                var intersect = intersects[ 0 ];
                	console.log(Lemon.modelType);

                    // var voxel = THREE.SceneUtils.createMultiMaterialObject( Lemon.Geometry[Lemon.modelType], [Lemon.Material.basic() ,Lemon.Material.wireframe()] );
                    var voxel = new THREE.Mesh(  Lemon.Geometry[Lemon.modelType], Lemon.Material.base() );
                    
                    //3d评论 评论球
                    if(Lemon.modelType == "comment"){
                        voxel.comment = "current-comment";
                        voxel.commentContent = Lemon.commentContent;
                    }
                    //3d评论 箭头球
                    if(Lemon.modelType == "position"){
                        voxel.arrowLocate = "position";
                    }
                    // var voxel = Lemon.Texture(Lemon.Geometry[Lemon.modelType]);
                    voxel.children.forEach( function(e){ e.userData.parent = voxel; });
                    
                    voxel.position.copy( intersect.point ).add( intersect.face.normal );
                    voxel.position.divideScalar( 10 ).floor().multiplyScalar( 10 ).addScalar( 10 );
                    voxel.position.y = 10;

                    scene.add( voxel );
                    objects.push( voxel );
                    Lemon.modelOperate(true);
                    Lemon.SELECTED = voxel; 
                    control.attach( voxel );
                    scene.remove(Lemon.tempMesh);
                    console.log(objects);
                    


                   	Lemon.EventListener.bind("model",2);
                   	Lemon.EventListener.bind("default");
	               
	                render();
		          }
		        }

    },

    // 鼠标释放
    "mouseup":{ 
        default:function( event ) {
            event.preventDefault();

            // 如果松开鼠标中键或者右键，并且已经选中模型，则显示模型控制
            if((event.which == 3 || event.which == 2)&& control.object != undefined){
                control.visible = true;
                return null;
            }
            container.style.cursor = 'auto';
        },
        selected:function( event){

            Lemon.isSelect = false; 
            if (Lemon.selDiv) { 
                document.body.removeChild(Lemon.selDiv); 
            } 
            _x = null, _y = null, Lemon.selDiv = null, startX = null, startY = null, evt = null; 
            Lemon.EventListener.bind("selected",2,window);
            Lemon.EventListener.bind("default");
        }
	},

    // 
    // "keydown":{ 
    //     default:function( event ) {
    //         console.log('key press');
    //         event.preventDefault();
    //         if(event.which == 17 || event.which == 224){
    //             var ctrlStatus = true;
    //             console.log('ctrl press');
    //             return null;
    //         }else{
    //             var ctrlStatus = false;
    //             console.log('not ctrl press');
    //             return null;
    //         }

    //         if(event.which == 67 && ctrlStatus == true){
    //             var cloneStatus = true;
    //             console.log('c press');
    //             return null;
    //         }else{
    //             var cloneStatus = false;
    //             console.log('not ctrl press');
    //             return null;
    //         }

    //         if(event.which == 86 && cloneStatus == true){
    //             console.log('v press');
    //              if(Lemon.SELECTED.userData.parent){
    //                 var cloneMesh = Lemon.SELECTED.userData.parent.clone();

    //                 // intersects[ 0 ].object.parent.children.forEach(function(e){e.opacity = 0.7;e.transparent=true; console.log('forEach parent child')})
                    
    //             }else{

    //                 var cloneMesh = Lemon.SELECTED.clone();
    //             }
    //             cloneMesh.translateX(10);
    //             cloneMesh.translateZ(10);
    //             scene.add(cloneMesh);
    //         }

    //     }
    // },

    // "keyup":{ 
    //     default:function( event ) {
    //         event.preventDefault();
    //         if(event.which == 17 || event.which == 224){
    //             var ctrlStatus = false;
    //         }

                
    //     }
    // }
}