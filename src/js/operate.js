 require.config({
    paths: {
        jquery: '/assets/libs/jQuery/jquery-2.2.3',
        colpick: '/assets/libs/jQuery/colpick',
        three: '/assets/libs/three/js/three',
        Layer: '/assets/libs/jQuery/layer/layer',
        stats: '/assets/libs/three/js/stats.min',
        datGui: '/assets/libs/three/js/dat.gui',
        ShadowMaterial: '/assets/libs/three/js/materials/ShadowMaterial',
        OrbitControls: '/assets/libs/three/js/controls/OrbitControls',
        TransformControls: '/assets/libs/three/js/controls/TransformControls',
        Projector: '/assets/libs/three/js/Projector',

        loadScene: '/assets/js/three/loadScene',
        model: '/assets/js/three/model',
        class: '/assets/js/three/class',
        

        OBJLoader: '/assets/libs/three/js/loaders/OBJLoader',
        DDSLoader: '/assets/libs/three/js/loaders/DDSLoader',
        TGALoader: '/assets/libs/three/js/loaders/TGALoader',
        ColladaLoader: '/assets/libs/three/js/loaders/ColladaLoader',
        STLLoader: '/assets/libs/three/js/loaders/STLLoader',
        VTKLoader: '/assets/libs/three/js/loaders/VTKLoader',
        PDBLoader: '/assets/libs/three/js/loaders/PDBLoader',
        XHRLoader: '/assets/libs/three/js/loaders/XHRLoader',
        PLYLoader: '/assets/libs/three/js/loaders/PLYLoader',
        AWDLoader: '/assets/libs/three/js/loaders/AWDLoader',
        AssimpJSONLoader: '/assets/libs/three/js/loaders/AssimpJSONLoader',
        VRMLLoader: '/assets/libs/three/js/loaders/VRMLLoader',
        BabylonLoader: '/assets/libs/three/js/loaders/BabylonLoader',


        GeometryExporter: '/assets/libs/three/js/GeometryExporter',
        SceneExporter: '/assets/libs/three/js/SceneExporter',
        SceneLoader:  '/assets/libs/three/js/SceneLoader',
        MaterialExporter: '/assets/libs/three/js/MaterialExporter'
        // OBJMTLLoader: '/assets/libs/three/js/loaders/OBJMTLLoader',
        // MTLLoader: '/assets/libs/three/js/loaders/MTLLoader',

    },
    shim: {
        three: {
            exports: 'THREE'
        },

        // thrreJs user code
        // 依赖关系：operate << loadScene << class << model
        "model" : ['three','jquery','Layer'],
        "class": ['model'],
        "loadScene": ['class'],

        // jQuery libs
        "colpick" : ['jquery'],
        "Layer" : ['jquery'],

        //threejs libs
        "ShadowMaterial": ['three'],
        "OrbitControls": ['three'],
        "TransformControls": ['three'],
        "Projector": ['three'],

        "GeometryExporter": ['three'],
        "SceneExporter": ['three'],
        "SceneLoader": ['three'],
        "MaterialExporter": ['three'],
        // file loader
        "OBJLoader": ['three'],
        "DDSLoader": ['three'],
        "TGALoader": ['three'],
        "ColladaLoader": ['three'],
        "STLLoader": ['three'],
        "VTKLoader": ['three'],
        "PDBLoader": ['three','XHRLoader'],
        "XHRLoader": ['three'],
        "PLYLoader": ['three'],
        "AWDLoader": ['three'],
        "AssimpJSONLoader": ['three'],
        "VRMLLoader": ['three'],
        "BabylonLoader": ['three','XHRLoader'],
        // "OBJMTLLoader": ['three'],
        // "MTLLoader" : ['three'],


    }
});

require([
    'jquery','three', 'colpick','stats','datGui',
    'ShadowMaterial','OrbitControls','TransformControls','Projector',
    'loadScene',
    'OBJLoader','DDSLoader','TGALoader','ColladaLoader','STLLoader',
    'VTKLoader','PDBLoader','PLYLoader','AWDLoader','AssimpJSONLoader',
    'VRMLLoader','BabylonLoader',
    'GeometryExporter','SceneExporter','SceneLoader','MaterialExporter'
    ],
function($, THREE, Layer) {
    // 初始化，总入口
   function init() {
        //渲染场景- loadScenes
        render();
        animate();

                

        $('#clear').bind("click",function(){
            localStorage.clear();
        });


        // 撤销
        $('#undo').bind("click",function(){

            Lemon.Command.undo();
        });


        // 重做
        $('#redo').bind("click",function(){

            Lemon.Command.redo();
        });


        // 保存当前数据（系统预定义模型）
        $('#save').bind("click",function(){

            Lemon.layer.msg('本地保存目前只支持保存系统预定义模型（即不包括上传模型）');
            Lemon.layer.prompt({
              title: '请输入存储名（默认为default）',
              formType: 2 //prompt风格，支持0-2
            }, function(name){

                if(name == ''){name="default"};
                Lemon.saveLocalSystemModel(name); 
            });
        });


        // 恢复数据
        $('#recover').bind("click",function(){

            Lemon.layer.prompt({
              title: '请输入存储名',
              formType: 2 //prompt风格，支持0-2
            }, function(name){

                if(name == ''){name="default"};
                Lemon.recoverLocalSystemModel(name);
            });

        });


        // 下载数据
        $('#downloadSystem').bind("click",function(){

            Lemon.layer.prompt({
              title: '请输入存储名（本地保存的名称）',
              formType: 2 //prompt风格，支持0-2
            }, function(name){

                if(name == ''){name="default"};
                Lemon.exportModelToFile(name);
            });

        });


        // 截图
        $('#screenshot').bind("click",function(){

            var imgData, imgNode;

            try {
                var strMime = "image/jpeg";
                var strDownloadMime = "image/octet-stream";
                imgData = renderer.domElement.toDataURL(strMime);

                Lemon.saveFile(imgData.replace(strMime, strDownloadMime), "screenCut.jpg");

            } catch (e) {
                console.log(e);
                return;
            }
        });

        
        // 3d评论
        $('#3d-comment').bind("click",function(){

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
                Lemon.creat3dComment();
            }
        });


        // 添加vr路径
        $('#vr-add').bind("click",function(){

            control.object = undefined;
            control.visible = false;

            Lemon.layer.prompt({
              title: '请输入移动速度',
              formType: 2 //prompt风格，支持0-2
            }, function(speed){
                // 添加评论球
                Lemon.addVrPath(speed);
            });

        });

        // 创建vr路径
        // $('#vr-creat').bind("click",function(){

        //     var data = Lemon.creatVrPath();
        //     console.log(data);

        // });


        // 监听文件上传
        $('#upload').bind("click",function(){

                $('#upload-file').click();
        });
        $('#upload-file').on('change', function() {

          var fileNameList = Lemon.getPostfix($(this).val());

          var resultFile = document.getElementById("upload-file").files[0];

          Lemon.loadModel(fileNameList.postfix, resultFile);


        });

// $.get("/assets/libs/three/upload-test/pinecone.obj", [], function(data){

//     var oMyBlob = new Blob([data], { "type" : "text/plain" });
//     Lemon.loadModel('.obj', oMyBlob);
// });



        // 监听模型选择
        $('.ModelList').bind("mousedown",function(event){

                control.object = undefined;
                control.visible = false;
                if($(event.target).data("modelType") == null){
                    return null;
                }
                Lemon.setmodelType($(event.target).data("modelType"));
                Lemon.addTempModel();
                Lemon.EventListener.bind('default',2);
                Lemon.EventListener.bind('model');

                console.log("data-model-type "+$(event.target).data("modelType"));
        })


        // 监听Text选择
        $('.TextList').bind("mousedown",function(event){

                if($(event.target).data("modelType") == null){
                    console.log('text???');
                    return null;

                }
                console.log('text');
                control.object = undefined;
                control.visible = false;

                Lemon.TextGeoFuc($(event.target).data("modelType"));
                
                console.log("data-model-type "+$(event.target).data("modelType"));
            });

        $('#text-btn').bind("mousedown",function(){

                if($('#text-input-content').val() == ''){
                    return null;
                }

                control.object = undefined;
                control.visible = false;

                Lemon.TextGeoFuc($('#text-input-content').val());
                
            });


        // 线框显示控制
        $('#nav-top-01').bind('click',function(){

            objects.forEach(function(e){
                if((e.able != 'false') && e.children[0]){
                    e.children.forEach(function(e){
                        if(e.material.userData.type == 'wireframe'){
                            e.visible = !Lemon.wireframeStatus;;
                        }
                    })
                }
            })
            Lemon.wireframeStatus = !Lemon.wireframeStatus;
        });


        //克隆模型
         $("#copy").bind('click',function(event){
            console.log(Lemon.SELECTED.userData.parent);
                if(Lemon.SELECTED.userData.parent){
                    var newGroup = new THREE.Object3D();
                    console.log('prent');
                    Lemon.SELECTED.userData.parent.children.forEach(function(e){
                        console.log(e);
                        newGroup.add(e.clone());
                    })
                    //bug
                    var cloneMesh = newGroup;
                }else{
                    var cloneMesh = Lemon.SELECTED.clone();
                }
                cloneMesh.translateX(10);
                cloneMesh.translateZ(10);
                objects.push(cloneMesh);
                console.log(objects);
                scene.add(cloneMesh);
         });


         //删除模型
         $("#deleted").bind('click',function(event){

            console.log(Lemon.SELECTED);
                if(Lemon.SELECTED.userData.parent){
                    var deletedObject = Lemon.SELECTED.userData.parent;
                }else{
                    var deletedObject = Lemon.SELECTED;
                }
                var deletedId = deletedObject.uuid;
                console.log(deletedId);
                for(var num = objects.length,i = 0; i<num;i++){
                    
                    if(objects[i].uuid == deletedId){
                        console.log('i:'+i);
                        objects.splice(i,1);
                        break;
                    }
                }
                console.log(objects);
                Lemon.modelOperate(false);
                control.object = undefined;
                control.visible = false;
                scene.remove(deletedObject);
                
         });


        // 贴图显示控制
        $("#texture").bind('click',function(event){

            console.log('click textuure')
             $("#texture-list").show(300);
            event.stopPropagation();//阻止冒泡
        });
        $("body").bind('click',function(){
             $("#texture-list").hide(300);
        })
        $('#texture-list').bind('click',function(){
             return false;
        });


        // 监听贴图选择
         $('.texture-content').bind("mousedown",function(event){

            // control.object = undefined;
            // control.visible = false;
            if($(event.target).data("textureType") == null){
                return null;
            }
            console.log(Lemon.SELECTED);
            var textureName = $(event.target).data("textureType");
            Lemon.Command.execute(new Lemon.ChangeTextureCommand(Lemon.SELECTED, textureName));

            // if(Lemon.SELECTED.children.length != 0){
            //     Lemon.SELECTED.children.forEach(function(e){
            //         if(e.material.userData.type != 'wireframe'){
            //             e.material = Lemon.useTexture($(event.target).data("textureType"));
            //             console.log(e.userData.type);
            //         }
                    
            //     });
            // }else{
            //     Lemon.SELECTED.material = Lemon.useTexture($(event.target).data("textureType"));
            // }

            
            console.log("data-textureType "+$(event.target).data("textureType"));
        })
        

        //浏览器大小改变时自动变换大小
        window.addEventListener( 'resize', onWindowResize, false );
        function onWindowResize() {

            camera.aspect = $('#operate-content .left').width() / $('#operate-content .left').height();
            camera.updateProjectionMatrix();
            renderer.setSize( $('#operate-content .left').width(), $('#operate-content .left').height() );
        }


//———————————————— 颜色选择器
        $('.color').colpick({

            colorScheme:'light',

            layout:'rgbhex',

            color:'ff8800',

            onSubmit:function(hsb,hex,rgb,el) {

                

                $(el).css('background-color', '#'+hex);
                Lemon.Command.execute(new Lemon.ChangeColorCommand(Lemon.SELECTED, hex, el));


                // if(Lemon.SELECTED.children.length != 0){
                //     Lemon.SELECTED.children.forEach(function(e){
                //         if(e.material.userData.type != 'wireframe'){
                //             e.material.color.setHex('0x'+hex);
                //         }
                        
                //     });
                // }else{
                //     Lemon.SELECTED.material.color.setHex('0x'+hex);
                // }
                // $(el).colpickHide();

            }

        });


//—————————————————— START 侧边栏手风琴效果    
        var Accordion = function(el, multiple) {

            this.el = el || {};
            this.multiple = multiple || false;

            // Variables privadas
            var links = this.el.find('.link');
            // Evento
            links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
            }

            Accordion.prototype.dropdown = function(e) {
                var $el = e.data.el;
                    $this = $(this),
                    $next = $this.next();

                $next.slideToggle();
                $this.parent().toggleClass('open');

                if (!e.data.multiple) {
                    $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
                };
            }   
            var accordion = new Accordion($('#accordion'), false);
        }
//—————————————————————— END
             
    //主程序，DOM加载完毕后操作
  $(function(){
          
      init();

         
  });

});
 