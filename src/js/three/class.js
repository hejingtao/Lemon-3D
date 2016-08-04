// 初始化layer
layer.config({
    path: '/assets/libs/jQuery/layer/', //layer.js所在的目录，可以是绝对目录，也可以是相对目录
});
Lemon.layer = layer;


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
                
            } else {
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
        seletedMove: function(){
                  evt = window.event || arguments[0]; 
                  if (isSelect) { 
                    if (selDiv.style.display == "none") { 
                      selDiv.style.display = ""; 
                    } 
                    _x = (evt.x || evt.clientX); 
                    _y = (evt.y || evt.clientY); 
                    selDiv.style.left = Math.min(_x, startX) + "px"; 
                    selDiv.style.top = Math.min(_y, startY) + "px"; 
                    selDiv.style.width = Math.abs(_x - startX) + "px"; 
                    selDiv.style.height = Math.abs(_y - startY) + "px"; 
             
                    // ---------------- 关键算法 ---------------------  
                    var _l = selDiv.offsetLeft, _t = selDiv.offsetTop; 
                    var _w = selDiv.offsetWidth, _h = selDiv.offsetHeight; 
                    for ( var i = 0; i < selList.length; i++) { 
                      var sl = selList[i].offsetWidth + selList[i].offsetLeft; 
                      var st = selList[i].offsetHeight + selList[i].offsetTop; 
                      if (sl > _l && st > _t && selList[i].offsetLeft < _l + _w && selList[i].offsetTop < _t + _h) { 
                        if (selList[i].className.indexOf("seled") == -1) { 
                          selList[i].className = selList[i].className + " seled"; 
                        } 
                      } else { 
                        if (selList[i].className.indexOf("seled") != -1) { 
                          selList[i].className = "fileDiv"; 
                        } 
                      } 
                    } 
             
                  } 
                  clearEventBubble(evt); 
        }
    },

    //鼠标按下
    "mousedown":{   
        default:function( event ) {
            event.preventDefault();
            if(event.which == 3 || event.which == 2){

            	console.log('right down');
            	control.visible = false;
            	return null;
            }
            raycaster.setFromCamera( mouse, camera );
            var intersects = raycaster.intersectObjects( objects,true);
            console.log(objects);
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
                function showSelDiv(arr) { 
                  var count = 0; 
                  var selInfo = ""; 
                  alert("共选择 " + count + " 个文件，分别是：\n" + selInfo); 
                } 
                function isObjectInFrustum(object3D){
                    if(object3D.able == 'false') return false;

                    object3D.geometry.computeBoundingSphere();
                    var sphere = object3D.geometry.boundingSphere;

                    var center = object3D.position;
                    console.log(sphere);
                    var negRadius = - sphere.radius;
                    console.log('top:'+topPlane.distanceToPoint(center)+'left:'+leftPlane.distanceToPoint(center)+'right'+rightPlane.distanceToPoint(center)+'bottom'+bottomPlane.distanceToPoint(center)+'radius:'+negRadius);

                    if(topPlane.distanceToPoint(center) < negRadius) return false;
                    if(leftPlane.distanceToPoint(center) < negRadius) return false;
                    if(rightPlane.distanceToPoint(center) < negRadius) return false;
                    if(bottomPlane.distanceToPoint(center) < negRadius) return false;

                    return true;
                }

                    var isSelect = true; 
                    var evt = window.event || arguments[0]; 
                    var startX = (evt.x || evt.clientX); 
                    var startY = (evt.y-50 || evt.clientY-50); 
                    var selDiv = document.createElement("div"); 
                    selDiv.style.cssText = "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;"; 
                    selDiv.id = "selectDiv"; 
                    document.body.appendChild(selDiv); 
                 
                    selDiv.style.left = startX + "px"; 
                    selDiv.style.top = startY + "px"; 
                 
                    var _x = null; 
                    var _y = null; 
                    clearEventBubble(evt); 
                 
                    document.onmousemove = function() { 
                      evt = window.event || arguments[0]; 
                      if (isSelect) { 
                        if (selDiv.style.display == "none") { 
                          selDiv.style.display = ""; 
                        } 
                        _x = (evt.x || evt.clientX); 
                        _y = (evt.y-50 || evt.clientY-50); 
                        selDiv.style.left = Math.min(_x, startX) + "px"; 
                        selDiv.style.top = Math.min(_y, startY)+50 + "px"; 
                        selDiv.style.width = Math.abs(_x - startX) + "px"; 
                        selDiv.style.height = Math.abs(_y - startY) + "px"; 
                 
                        // ---------------- 关键算法 ---------------------  
                        var _l = selDiv.offsetLeft, _t = selDiv.offsetTop; 
                        var _w = selDiv.offsetWidth, _h = selDiv.offsetHeight; 

                        var topLeftCorner3D = new THREE.Vector3( Math.min(_x, startX) , Math.min(_y, startY), 2000 );
                        var topRightCorner3D = new THREE.Vector3( Math.min(_x, startX)+Math.abs(_x - startX) , Math.min(_y, startY), 2000 );
                        var bottomLeftCorner3D = new THREE.Vector3( Math.min(_x, startX) , Math.min(_y, startY)+Math.abs(_y - startY) , 2000 );
                        var bottomRightCorner3D = new THREE.Vector3( Math.min(_x, startX)+Math.abs(_x - startX) , Math.min(_y, startY)+Math.abs(_y - startY), 2000);

                        console.log('newX: '+_x+ ' startX: '+startX);
                        console.log('newX: '+_y+ ' startX: '+startY);

                        var smtopLeftCorner3D = new THREE.Vector3( Math.min(_x, startX) , Math.min(_y, startY), 0.1 ).unproject(camera);
                        var smtopRightCorner3D = new THREE.Vector3( Math.min(_x, startX)+Math.abs(_x - startX) , Math.min(_y, startY), 0.1 ).unproject(camera);
                        var smbottomLeftCorner3D = new THREE.Vector3( Math.min(_x, startX) , Math.min(_y, startY)+Math.abs(_y - startY) , 0.1 ).unproject(camera);
                        var smbottomRightCorner3D = new THREE.Vector3( Math.min(_x, startX)+Math.abs(_x - startX) , Math.min(_y, startY)+Math.abs(_y - startY), 0.1).unproject(camera);

                        topPlane = new THREE.Plane();
                        rightPlane = new THREE.Plane();
                        bottomPlane = new THREE.Plane();
                        leftPlane = new THREE.Plane();
                        nearPlane = new THREE.Plane();
                        farPlane = new THREE.Plane();

                        // console.log('______');
                        // console.log(topLeftCorner3D);
                        // console.log(topRightCorner3D);
                        // console.log(bottomLeftCorner3D);
                        // console.log(bottomRightCorner3D);
                        // console.log('____');
                        topPlane.setFromCoplanarPoints(camera.position, topLeftCorner3D, topRightCorner3D);
                        rightPlane.setFromCoplanarPoints(camera.position, topRightCorner3D, bottomRightCorner3D);
                        bottomPlane.setFromCoplanarPoints(camera.position, bottomRightCorner3D, bottomLeftCorner3D);
                        leftPlane.setFromCoplanarPoints(camera.position, bottomLeftCorner3D, topLeftCorner3D);
                        // nearPlane.setFromCoplanarPoints(smbottomLeftCorner3D, smtopLeftCorner3D, smtopRightCorner3D, smbottomRightCorner3D);
                        // farPlane.setFromCoplanarPoints(bottomLeftCorner3D, topLeftCorner3D, topRightCorner3D, bottomRightCorner3D);
                        
                        vector = new THREE.Vector3();
                        vector.set( 0, 0, 1 );
                        vector.applyQuaternion( camera.quaternion );
                        nearPlane.setFromNormalAndCoplanarPoint(vector,camera.position);
                        var vector2 = new THREE.Vector3( 0, 0, 100 );
                        vector2.applyQuaternion( camera.quaternion );
                        vector2.add(camera.position);
                        farPlane.setFromNormalAndCoplanarPoint(vector,vector2);


                    camera.updateMatrix(); // make sure camera's local matrix is updated
                    camera.updateMatrixWorld(); // make sure camera's world matrix is updated
                    camera.matrixWorldInverse.getInverse( camera.matrixWorld );
                    var projScreenMatrix = new THREE.Matrix4();
                    projScreenMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );


                        frustum = new THREE.Frustum(topPlane, bottomPlane, leftPlane, rightPlane,nearPlane ,farPlane);
                        
                        frustum.setFromMatrix( new THREE.Matrix4().multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse ) );
                        // console.log('frustum');
                        // console.log(frustum);
                        for(var i=0;i<objects.length;i++){
                            if(isObjectInFrustum(objects[i])){
                            // if(frustum.intersectsSphere(objects[i].geometry.boundingSphere) && objects[i].able != 'false'){
                                // console.log('catch it !!!!!!!wow!!');
                                // objects[i].material.color.set(0x0000ff);
                            }
                        }
                      } 
                      clearEventBubble(evt); 
                    } 
                 
                    document.onmouseup = function() { 
                      isSelect = false; 

                      if (selDiv) { 
                        document.body.removeChild(selDiv); 
                      } 
                       _x = null, _y = null, selDiv = null, startX = null, startY = null, evt = null; 
                    } 
                // 框选  END  --------------

            }
        },
        model : function( event ) {
	                event.preventDefault();

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

            if((event.which == 3 || event.which == 2)&& control.object != undefined){
                control.visible = true;
                return null;
            }
            container.style.cursor = 'auto';
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