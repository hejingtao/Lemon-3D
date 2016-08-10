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

Lemon.CommandStack = {
    'redo': [],
    'undo': [],
    'length': 10
};

Lemon.Command = {
    execute: function(command){

        command.execute();
        Lemon.CommandStack.undo.push(command);
        console.log(Lemon.CommandStack)
    },
    undo: function(){
        
        var tempCommand = Lemon.CommandStack.undo.pop();
        tempCommand.undo();
        Lemon.CommandStack.redo.push(tempCommand);
        console.log(Lemon.CommandStack)
    },
    redo: function(){
        var tempCommand = Lemon.CommandStack.redo.pop();
        tempCommand.redo();
        Lemon.CommandStack.undo.push(tempCommand);
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
            console.log(this.oldColor);
            $(this.el).css('background-color', '#'+tempColor);
            console.log(tempColor);
            
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



//保存截图文件
var strDownloadMime = "image/octet-stream";
var saveFile = function (strData, filename) {
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



// 框选 相关方法
function selectdInit(event){

    var isSelect = true; 
    var evt = window.event || arguments[0]; 
    // 鼠标初始位置
    var startX = (evt.x || evt.clientX); 
    var startY = (evt.y-50 || evt.clientY-50); 
    // 创建选择框
    var selDiv = document.createElement("div"); 
    selDiv.style.cssText = "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;"; 
    selDiv.id = "selectDiv"; 
    document.body.appendChild(selDiv); 
    
    // 选择框初始定位
    selDiv.style.left = startX + "px"; 
    selDiv.style.top = startY + "px"; 
    // 鼠标位置预定义
    var _x = null; 
    var _y = null; 
    clearEventBubble(evt); 
}
function clearEventBubble(evt) { 

  if (evt.stopPropagation) 
    evt.stopPropagation(); 
  else 
    evt.cancelBubble = true; 
  if (evt.preventDefault) 
    evt.preventDefault(); 
  else 
    evt.returnValue = false; 
} 
function isObjectInSelect(object3D){

    if(object3D.able == 'false') return false;
    // 获取控制区域宽高
    var width = $('#WebGL-output').width(), height = $(window).height() - 50;
    var widthHalf = width / 2, heightHalf = height / 2;

    // 关键算法
    var vector = new THREE.Vector3();
    var projector = new THREE.Projector();
    projector.projectVector( vector.setFromMatrixPosition( object3D.matrixWorld ), camera );
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
        selected: function(){

                      evt = window.event || arguments[0]; 
                      if (isSelect) { 
                        // 显示选择框
                        if (selDiv.style.display == "none") { 
                          selDiv.style.display = ""; 
                        } 
                        // 获取鼠标实时位置
                        _x = (evt.x || evt.clientX); 
                        _y = (evt.y-50 || evt.clientY-50); 
     
                        Lemon.selectFrame.left = Math.min(_x, startX); 
                        Lemon.selectFrame.top = Math.min(_y, startY)+50; 

                        Lemon.selectFrame.width = Math.abs(_x - startX); 
                        Lemon.selectFrame.height = Math.abs(_y - startY); 

                        // 判断选择框位置
                        selDiv.style.left = Math.min(_x, startX) + "px"; 
                        selDiv.style.top  = Math.min(_y, startY)+50 + "px"; 
                        // 计算选择框长度、高度
                        selDiv.style.width = Math.abs(_x - startX) + "px"; 
                        selDiv.style.height = Math.abs(_y - startY) + "px"; 
                 
                        clearTimeout(Lemon.tempTimeout);
                        Lemon.tempTimeout = setTimeout(function(){
                            for(var i=0;i<objects.length;i++){
                                if(isObjectInSelect(objects[i])){
                                    console.log('catch it');
                                }
                            }
                        },100)
                        
                      } 
                      clearEventBubble(evt); 
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

                selectedInit(event);
                Lemon.EventListener.bind("default",2);
                Lemon.EventListener.bind("selected");
                    // var isSelect = true; 
                    // var evt = window.event || arguments[0]; 
                    // // 鼠标初始位置
                    // var startX = (evt.x || evt.clientX); 
                    // var startY = (evt.y-50 || evt.clientY-50); 
                    // // 创建选择框
                    // var selDiv = document.createElement("div"); 
                    // selDiv.style.cssText = "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;"; 
                    // selDiv.id = "selectDiv"; 
                    // document.body.appendChild(selDiv); 
                    
                    // // 选择框初始定位
                    // selDiv.style.left = startX + "px"; 
                    // selDiv.style.top = startY + "px"; 
                    // // 鼠标位置预定义
                    // var _x = null; 
                    // var _y = null; 
                    // clearEventBubble(evt); 
                 
                    // document.onmousemove = function() { 
                    //   evt = window.event || arguments[0]; 
                    //   if (isSelect) { 
                    //     // 显示选择框
                    //     if (selDiv.style.display == "none") { 
                    //       selDiv.style.display = ""; 
                    //     } 
                    //     // 获取鼠标实时位置
                    //     _x = (evt.x || evt.clientX); 
                    //     _y = (evt.y-50 || evt.clientY-50); 
     
                    //     Lemon.selectFrame.left = Math.min(_x, startX); 
                    //     Lemon.selectFrame.top = Math.min(_y, startY)+50; 

                    //     Lemon.selectFrame.width = Math.abs(_x - startX); 
                    //     Lemon.selectFrame.height = Math.abs(_y - startY); 

                    //     // 判断选择框位置
                    //     selDiv.style.left = Math.min(_x, startX) + "px"; 
                    //     selDiv.style.top  = Math.min(_y, startY)+50 + "px"; 
                    //     // 计算选择框长度、高度
                    //     selDiv.style.width = Math.abs(_x - startX) + "px"; 
                    //     selDiv.style.height = Math.abs(_y - startY) + "px"; 
                 
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

                    //   if (selDiv) { 
                    //     document.body.removeChild(selDiv); 
                    //   } 
                    //    _x = null, _y = null, selDiv = null, startX = null, startY = null, evt = null; 
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
                        voxel.comment = "comment";
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

            isSelect = false; 
            if (selDiv) { 
                document.body.removeChild(selDiv); 
            } 
            _x = null, _y = null, selDiv = null, startX = null, startY = null, evt = null; 
            Lemon.EventListener.bind("selected",2);
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