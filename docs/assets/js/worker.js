 require.config({
    paths: {
        three: 'libs/three/three'
    },
    shim: {
        three: {
            exports: 'THREE'
        }
    }
});

requirejs([
    'three'
    ],
function(THREE) {

onmessage =function (loadedMesh){
    var material = new THREE.MeshLambertMaterial({color: 0x5C3A21});
    loadedMesh.children.forEach(function (child) {
        child.material = material;
        child.userData.parent = loadedMesh;
        child.geometry.computeFaceNormals();
        child.geometry.computeVertexNormals();
    });
    console.log('worker is competing');
  postMessage( loadedMesh );//将获取到的数据发送会主线程
}

});
 