// 此项目作用域
var Lemon = {};
// 初始化layer
layer.config({
    path: '/assets/libs/jQuery/layer/', //layer.js所在的目录，可以是绝对目录，也可以是相对目录
});
Lemon.layer = layer;

Lemon.commentClickNum = 0;




Lemon.selectFrame={
    'top': 0,
    'left': 0,
    'width': 0,
    'height': 0
};

// 字体模型加载
Lemon.textGeo = null;
Lemon.TextGeoFuc = function(text){

		var loader = new THREE.FontLoader();

		loader.load( '/assets/libs/fonts/helvetiker_bold.typeface.js', function ( font ) {

		    var textGeo = new THREE.TextGeometry( text, {

		        font: font,

		        size: 20,
		        height: 5,
		        curveSegments: 2,

		        bevelThickness: 2,
		        bevelSize: 1,
		        bevelEnabled: true

		    } );

            var textMesh = new THREE.Mesh( textGeo, Lemon.Material.base() );
            textMesh.position.set( 5, 5, 100 );
            objects.push(textMesh);
            scene.add( textMesh );
	    })

	}


// 模型数据定义
Lemon.Geometry = {

	comment : new THREE.SphereGeometry( 4, 10, 10, 0 ),
	
	position: new THREE.SphereGeometry( 2, 10, 10, 0 ),
	// 正方体
	cube : new THREE.BoxGeometry( 20, 20, 20 ),
	// 长方体
	cuboid : new THREE.BoxGeometry( 40, 20, 20 ),
	// 球体
	sphere : new THREE.SphereGeometry( 10, 20, 20, 0 ),
	// 圆柱体
	cylinder : new THREE.CylinderGeometry( 10, 10, 30, 20),
	// 圆锥体
	cone : new THREE.CylinderGeometry( 0, 10, 30, 20),
	// 圆环体
	torus : new THREE.TorusGeometry( 10, 5, 30, 30 ,Math.PI),
	// 正四面体
	tetrahedron : new THREE.TetrahedronGeometry( 10, 0 ),

	arrow: function(){

		var vertices=[
			new THREE.Vector3( 0, 0, 0 ),

			new THREE.Vector3( 5, 5, 5 ),
			new THREE.Vector3( 5, 5, -5 ),
			new THREE.Vector3( -5, 5, 5 ),
			new THREE.Vector3( -5, 5, -5),

			new THREE.Vector3( 2,2,2 ),
			new THREE.Vector3( 2,2,-2),
			new THREE.Vector3( -2,2,2),
			new THREE.Vector3( -2,2,-2),
			new THREE.Vector3( 2,10,2 ),
			new THREE.Vector3( 2,10,-2),
			new THREE.Vector3( -2,10,2),
			new THREE.Vector3( -2,10,-2),
		];

		var faces = [
			new THREE.Face3( 0,2,4),
			new THREE.Face3( 0,2,1),
			new THREE.Face3( 0,1,3),
			new THREE.Face3( 0,3,4),
			new THREE.Face3( 2,3,4),
			new THREE.Face3( 2,3,1),
			new THREE.Face3( 8,7,11),
			new THREE.Face3( 11,12,8),
			new THREE.Face3( 8,6,10),
			new THREE.Face3( 10,12,8),
			new THREE.Face3( 5,6,10),
			new THREE.Face3( 10,9,5),
			new THREE.Face3( 11,9,5),
			new THREE.Face3( 5,7,11),
			new THREE.Face3( 11,12,10),
			new THREE.Face3( 11,9,10)
		];

		var geom = new THREE.Geometry();
		geom.vertices= vertices;
		geom.faces = faces;
		
		geom.mergeVertices();
		return geom;
	}()
}


// 材质定义
Lemon.Material = {

    // 带线框的basic材质
	wireframe : function(id){

		var tempMaterial = new THREE.MeshBasicMaterial( {color: 0x000000, opacity: 0.1, transparent: true,wireframe:true });
		// tempMaterial.modelId = 1;
		// console.log('tempMaterial:' );
		// console.log(tempMaterial);
		tempMaterial.userData = {};
		tempMaterial.userData.type = 'wireframe';
		return tempMaterial;
	},

    // basic材质
	basic : function(id){

		var tempMaterial = new THREE.MeshBasicMaterial( { color: 0xDC143C  } );
		tempMaterial.userData = {};
		tempMaterial.userData.type = 'basic';
		tempMaterial.side = THREE.DoubleSide;
		// tempMaterial.modelId = 1;
		// console.log('tempMaterial:' );
		// console.log(tempMaterial);
		return tempMaterial;
	},

    // Lamber材质
	base : function(id){

		var tempMaterial = new THREE.MeshLambertMaterial( { color: 0xDC143C} );
		tempMaterial.userData = {};
		tempMaterial.userData.type = 'base';
		tempMaterial.side = THREE.DoubleSide;
		// tempMaterial.modelId = 1;
		// console.log('tempMaterial:' );
		// console.log(tempMaterial);
		return tempMaterial;
	},

    // 未放置时的临时模型
	temp : function(id){

		var tempMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
		tempMaterial.userData = {};
		tempMaterial.userData.type = 'temp';
		tempMaterial.side = THREE.DoubleSide;
		// tempMaterial.modelId = 1;
		// console.log('tempMaterial:' );
		// console.log(tempMaterial);
		return tempMaterial;
	},



}


// 贴图定义
Lemon.TextureList = {

	blank: {
		type: 'blank'
	},
	seafloor : {
		type: 'dds',
		file: '/assets/libs/three/textures/seafloor.dds'
	},

	board01 : {
		type: 'tga',
		file: '/assets/libs/three/textures/crate_color8.tga'
	},

	floorWood : {
		type: 'common',
		file: '/assets/libs/three/textures/general/floor-wood.jpg'
	},

	darkerWood : {
		type: 'common',
		file: '/assets/libs/three/textures/general/darker_wood.jpg'
	},

	stone : {
		type: 'bump',
		file: '/assets/libs/three/textures/general/stone.jpg',
		file2: '/assets/libs/three/textures/general/stone-bump.jpg',
	},
	brickWall : {
		type: 'common',
		file: '/assets/libs/three/textures/general/brick-wall.jpg'
	},
	plaster : {
		type: 'normalMap',
		file: '/assets/libs/three/textures/general/plaster.jpg',
		file2: '/assets/libs/three/textures/general/plaster-normal.jpg',
	},
	bathroom : {
		type: 'normalMap',
		file: '/assets/libs/three/textures/general/bathroom.jpg',
		file2: '/assets/libs/three/textures/general/bathroom-normal.jpg',
	},
	metal : {
		type: 'normalMap',
		file: '/assets/libs/three/textures/general/metal-floor.jpg',
		file2: '/assets/libs/three/textures/general/metal-floor-normal.jpg',
	},
	metalRust : {
		type: 'common',
		file: '/assets/libs/three/textures/general/metal-rust.jpg'
	},
	wood2 : {
		type: 'common',
		file: '/assets/libs/three/textures/general/wood-2.jpg'
	},
	weave : {
		type: 'bump',
		file: '/assets/libs/three/textures/general/weave.jpg',
		file2: '/assets/libs/three/textures/general/weave-bump.jpg',
	},
}


// 使用贴图
Lemon.useTexture = function(name) {

	console.log('name'+name);
	var textureType = Lemon.TextureList[name].type;
    if(textureType == 'blank'){
    	var mat = Lemon.Material.base();
		return mat;
    }else if(textureType == 'dds'){
    	var loader = new THREE.DDSLoader();
		var texture = loader.load(Lemon.TextureList[name].file);
    }else if(textureType == 'tga'){
    	var loader = new THREE.TGALoader();
		var texture = loader.load(Lemon.TextureList[name].file);
    }else{
    	var texture = THREE.ImageUtils.loadTexture(Lemon.TextureList[name].file);
    }

    var mat = new THREE.MeshBasicMaterial();
    mat.map = texture;

    if(textureType == 'bump'){
    	var bump = THREE.ImageUtils.loadTexture(Lemon.TextureList[name].file2);
        mat.bumpMap = bump;
        mat.bumpScale = 0.2;
    }
    if(textureType == 'normalMap'){
    	var normal = THREE.ImageUtils.loadTexture(Lemon.TextureList[name].file2);
        mat.normalMap = normal;
    }
    mat.side = THREE.DoubleSide;
    mat.userData = {};
    mat.userData.type = textureType;
    mat.textureName = name;
    return mat;

}




// 加载模型文件
Lemon.loadModelFuc = null;
Lemon.loadModel = function(postfix, file){

      var loader= null;
      var loaderStatus = false;

      switch(postfix){

        case ".lem3d": //   error

            loaderStatus = true;
            Lemon.loadModelFuc = function () {
            var urlData = this.result;
            console.log(urlData)
            Lemon.recoverSystemModel(urlData);
        }
        break;

        case ".obj":

            loader = new THREE.OBJLoader();
            loaderStatus = true;
            Lemon.loadModelFuc = function () {
                  
                    var urlData = this.result;
                    loader.load(urlData,function (loadedMesh) {

                        var material = new THREE.MeshLambertMaterial({color: 0x5C3A21});
                        loadedMesh.children.forEach(function (child) {
                            child.material = material;
                            child.userData.parent = loadedMesh;
                            child.geometry.computeFaceNormals();
                            child.geometry.computeVertexNormals();
                        });

                        loadedMesh.scale.set(100, 100, 100);
                        loadedMesh.rotation.x = -0.3;
                        loadedMesh.position.y = 5;
                        scene.add(loadedMesh);
                        objects.push(loadedMesh);
                    });
                  }; 
            break;


        case ".dae":

            var loader = new THREE.ColladaLoader();
            loaderStatus = true;
            Lemon.loadModelFuc = function () {
                var urlData = this.result;
                var mesh;
                loader.load(urlData, function (loadedMesh) {
                    mesh = loadedMesh.scene.children[0].children[0].clone();
                    mesh.scale.set(4, 4, 4);
                    scene.add(mesh);
                    objects.push(mesh);
                });
            }
            break;


        case ".stl":

            var loader = new THREE.STLLoader();
            loaderStatus = true;
            Lemon.loadModelFuc = function () {
                var group = new THREE.Object3D();
                var urlData = this.result;
                loader.load(urlData, function (geometry) {
                    console.log(geometry);
                    var mat = new THREE.MeshLambertMaterial({color: 0x7777ff});
                    group = new THREE.Mesh(geometry, mat);
                    group.rotation.x = -0.5 * Math.PI;
                    group.scale.set(0.6, 0.6, 0.6);
                    scene.add(group);
                    objects.push(group);
                });
            }
            break;


        case ".vtk":

            var loader = new THREE.VTKLoader();
            loaderStatus = true;
            Lemon.loadModelFuc = function () {
                var group = new THREE.Object3D();
                var urlData = this.result;
                loader.load(urlData, function (geometry) {
                    var mat = new THREE.MeshLambertMaterial({color: 0xaaffaa});
                    group = new THREE.Mesh(geometry, mat);
                    group.scale.set(50, 50, 50);
                    scene.add(group);
                    objects.push(group);
                });
            }
            break;


        case ".pdb":  //error

            var loader = new THREE.PDBLoader();
            loaderStatus = true;
            Lemon.loadModelFuc = function () {
                var mesh;
                var group = new THREE.Object3D();
                var urlData = this.result;
                loader.load(urlData, function (geometry, geometryBonds) {
                    //        loader.load("../assets/models/diamond.pdb", function (geometry, geometryBonds) {
                    var i = 0;

                    geometry.vertices.forEach(function (position) {
                        var sphere = new THREE.SphereGeometry(0.2);
                        var material = new THREE.MeshPhongMaterial({color: geometry.colors[i++]});
                        var mesh = new THREE.Mesh(sphere, material);
                        mesh.position.copy(position);
                        group.add(mesh);
                    });

                    for (var j = 0; j < geometryBonds.vertices.length; j += 2) {
                        var path = new THREE.SplineCurve3([geometryBonds.vertices[j], geometryBonds.vertices[j + 1]]);
                        var tube = new THREE.TubeGeometry(path, 1, 0.04);
                        var material = new THREE.MeshPhongMaterial({color: 0xcccccc});
                        var mesh = new THREE.Mesh(tube, material);
                        group.add(mesh);
                    }

                    scene.add(group);
                    objects.push(group);
                });
            }
            break;


        case ".ply":

            var loader = new THREE.PLYLoader();
            loaderStatus = true;
            Lemon.loadModelFuc = function () {
                var group = new THREE.Object3D();
                var urlData = this.result;
            loader.load(urlData, function (geometry) {
                var material = new THREE.PointCloudMaterial({
                    color: 0xffffff,
                    size: 0.4,
                    opacity: 0.6,
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    // map: generateSprite()
                });
                group = new THREE.PointCloud(geometry, material);
                group.sortParticles = true;
                objects.push(group);
                scene.add(group);
            });
        }
        break;


        case ".awd":

            var loader = new THREE.AWDLoader();
            loaderStatus = true;
            Lemon.loadModelFuc = function () {
                var group = new THREE.Object3D();
                var urlData = this.result;
            loader.load(urlData, function (model) {

                model.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = new THREE.MeshLambertMaterial({color: 0xaaaaaa});
                        console.log(child.geometry);
                    }
                });

                model.scale.set(0.1, 0.1, 0.1);
                objects.push(model);
                scene.add(model);

            });
        }
        break;


        case ".json": //assimp   error

            var loader = new THREE.AssimpJSONLoader();
            loaderStatus = true;
            Lemon.loadModelFuc = function () {
                var group = new THREE.Object3D();
                var urlData = this.result;
                loader.load(urlData, function (model) {

                    console.log(model);

                    model.traverse(function (child) {
                        if (child instanceof THREE.Mesh) {
        //                    child.material = new THREE.MeshLambertMaterial({color:0xaaaaaa});
                            console.log(child.geometry);
                        }
                    });

                    model.scale.set(0.1, 0.1, 0.1);
                    objects.push(model);
                    scene.add(model);

                });
        }
        break;


        case ".wrl": 

            var loader = new THREE.VRMLLoader();
            loaderStatus = true;
            Lemon.loadModelFuc = function () {
                var group = new THREE.Object3D();
                var urlData = this.result;
                loader.load(urlData, function (model) {

                    console.log(model);

                    model.traverse(function (child) {
                        if (child instanceof THREE.Mesh) {
                           child.material = new THREE.MeshLambertMaterial({color:0xaaaaaa});
                            console.log(child.geometry);
                        }
                    });

                    model.scale.set(10, 10, 10);
                    objects.push(model);
                    scene.add(model);

                });
        }
        break;


        case ".babylon": //   error

            var loader = new THREE.BabylonLoader();
            loaderStatus = true;
            Lemon.loadModelFuc = function () {
            var group = new THREE.Object3D();
            var urlData = this.result;
            loader.load(urlData, function (loadedScene) {

                // babylon loader contains a complete scene.
                console.log(loadedScene.children[1].material = new THREE.MeshLambertMaterial());
                scene = loadedScene;

            });
        }
        break;


        default:

            console.log('暂时不支持该后缀！');
            loaderStatus = false;
      }

      if(loaderStatus){

        // var resultFile = document.getElementById("upload-file").files[0];
        if (file) {

            var reader = new FileReader();
            reader.onloadstart = function(){

                Lemon.modelLoading = Lemon.layer.load(1, {shade: [0.5, '#ffffff'],time: 10*1000});
            }
            reader.onloadend = function(){

                Lemon.uploadFileList.push({'file': file, 'state': true});
                Lemon.layer.close(Lemon.modelLoading);  
            }
            reader.onload = Lemon.loadModelFuc;
            reader.readAsDataURL(file);
        }
      }

}
