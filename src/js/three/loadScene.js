        var container, stats;
        var camera, controls, scene, renderer;
        var objects = [], plane;
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2(),
        offset = new THREE.Vector3(),
        INTERSECTED, SELECTED;

        // 初始化FPS状态栏
        var stats = initStats();
        function initStats() {

            var stats = new Stats();
                stats.setMode(0); // 0: fps, 1: ms
                // Align top-left
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.left = '0px';
                stats.domElement.style.top = '0px';
                document.getElementById("Stats-output").appendChild(stats.domElement);
                return stats;
        }      
        

        // 创建场景             
        var scene = new THREE.Scene();

// 箭头
// var dir = new THREE.Vector3( 30, 30, 30 );
// var origin = new THREE.Vector3( 10, 10, 10 );
// var length = 100;
// var hex = 0xff0000;

// var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
// objects.push(arrowHelper);
// scene.add( arrowHelper );



        // 新建相机，并且添加至场景 
        $('body').css("height",($(window).height())+"px");
        $('#operate-content').css("height",($(window).height() - 50)+"px");
        var camera = new THREE.PerspectiveCamera(45, $('#operate-content .left').width() / $('#operate-content .left').height(), 0.1, 20000);
        scene.add(camera);

        // 渲染并且设置场景大小 
        var renderer = new THREE.WebGLRenderer({
            antialias:true,
            preserveDrawingBuffer: true});
        renderer.setClearColor(new THREE.Color(0xfafafa, 1.0));
        // renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize($('#operate-content .left').width(), $('#operate-content .left').height());
        
        // 视图控制 
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.zoomSpeed = 2;
        controls.addEventListener( 'change', render );
        

        //创建线条基面
        var size = 100, step = 1 , step2 = 10,step3 = 100;
        var geometry1 = new THREE.Geometry();
        for ( var i = - size; i <= size; i += step ) {
            geometry1.vertices.push( new THREE.Vector3( - size, 0, i ) );
            geometry1.vertices.push( new THREE.Vector3(   size, 0, i ) );
            geometry1.vertices.push( new THREE.Vector3( i, 0, - size ) );
            geometry1.vertices.push( new THREE.Vector3( i, 0,   size ) );

        }
        var material = new THREE.LineBasicMaterial( { color: 0x007fff, opacity: 0.1, transparent: true } );
        var line = new THREE.LineSegments( geometry1, material );
        scene.add( line );

        var geometry2 = new THREE.Geometry();
        for ( var i = - size; i <= size; i += step2 ) {
            geometry2.vertices.push( new THREE.Vector3( - size, 0, i ) );
            geometry2.vertices.push( new THREE.Vector3(   size, 0, i ) );
            geometry2.vertices.push( new THREE.Vector3( i, 0, - size ) );
            geometry2.vertices.push( new THREE.Vector3( i, 0,   size ) );

        }
        var material = new THREE.LineBasicMaterial( { color: 0x4d4dff, opacity: 0.6, transparent: true } );
        var line2 = new THREE.LineSegments( geometry2, material );
        scene.add( line2 );
        
        var geometry3 = new THREE.Geometry();
        for ( var i = - size; i <= size; i += step3 ) {
            geometry3.vertices.push( new THREE.Vector3( - size, 0, i ) );
            geometry3.vertices.push( new THREE.Vector3(   size, 0, i ) );
            geometry3.vertices.push( new THREE.Vector3( i, 0, - size ) );
            geometry3.vertices.push( new THREE.Vector3( i, 0,   size ) );

        }
        var material = new THREE.LineBasicMaterial( { color: 0x4d4d4d, opacity: 1, transparent: true } );
        var line3 = new THREE.LineSegments( geometry3, material );
        scene.add( line3 );
        // 创建隐藏平面用于定位
        var geometry = new THREE.PlaneBufferGeometry( 600, 600 );
        geometry.rotateX( - Math.PI / 2 );
        plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
        plane.able = 'false';
        scene.add( plane );
        objects.push( plane );
        
        // 移动时的工作plane
        // workPlane = new THREE.Mesh(
        //     new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
        //     new THREE.MeshBasicMaterial({ visible: false })
        //     // new THREE.MeshBasicMaterial( { visible: false } )
        // );
        // scene.add( workPlane );
        

        // 设置相机位置，并且定义方向 
        camera.position.x = 0;
        camera.position.y = 180;
        camera.position.z = 180;
        camera.lookAt(scene.position);
        

        // 添加灯光       
        var light = new Array();
        var lightDistance = 400;
        lightX =[0,   0,    lightDistance, -lightDistance, 0,     0];
        lightY =[lightDistance,-lightDistance,0,    0,     0,     0];
        lightZ =[0,   0,    0,    0,     lightDistance,  -lightDistance]
        lightIntensity = [1, 0.85, 0.7, 0.75 , 0.8, 0.75];
        for(var i =0; i<6;i++){
            light[i] = new THREE.DirectionalLight(0xffffff);
            light[i].position.set(lightX[i], lightY[i], lightZ[i]);
            light[i].castShadow = false;
            light[i].shadow.camera.near = 2;
            light[i].shadow.camera.far = 2000;
            light[i].shadow.camera.left = -1000;
            light[i].shadow.camera.right = 1000;
            light[i].shadow.camera.top = 1000;
            light[i].shadow.camera.bottom = -1000;
            light[i].distance = 0;
            light[i].intensity = lightIntensity[i];
            light[i].shadow.mapSize.width = 1024;
            light[i].shadow.mapSize.height = 1024;
            scene.add(light[i]);
            // var test = new THREE.DirectionalLightHelper( light[i],100);
            // scene.add(test) ;
        }
        
        // 初始化模型控制器
        control = new THREE.TransformControls( camera, renderer.domElement );
        control.able = "false";
        control.addEventListener( 'change', render );
        window.addEventListener( 'keydown', function ( event ) {

                    switch ( event.keyCode ) {

                        case 81: // Q
                            control.setSpace( control.space === "local" ? "world" : "local" );
                            break;

                        case 17: // Ctrl
                            control.setTranslationSnap( 5 );
                            control.setRotationSnap( THREE.Math.degToRad( 15 ) );
                            break;

                        case 87: // W
                            control.setMode( "translate" );
                            break;

                        case 69: // E
                            control.setMode( "rotate" );
                            break;

                        case 82: // R
                            control.setMode( "scale" );
                            break;

                        case 187:
                        case 107: // +, =, num+
                            control.setSize( control.size + 0.1 );
                            break;

                        case 189:
                        case 109: // -, _, num-
                            control.setSize( Math.max( control.size - 0.1, 0.1 ) );
                            break;
                    }
                });
        // 添加控制器并隐藏
        scene.add( control );
        control.object = undefined;
        control.visible = false;



        // 添加渲染DOM节点
        container = document.getElementById("WebGL-output").appendChild(renderer.domElement);
        

        // 绑定默认事件
        Lemon.EventListener.bind("default");

            
        // 场景渲染定义
        function animate() {

             requestAnimationFrame( animate );
             stats.update();
             render();
             controls.update();
             // transformControl.update();
        }
        function render() {

            renderer.render(scene, camera);
        }
