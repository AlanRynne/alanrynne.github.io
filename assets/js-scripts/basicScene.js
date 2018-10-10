
var scene, camera, renderer;

init();

// instantiate a loader
var loader = new THREE.OBJLoader();
var obj;
var material = new THREE.MeshNormalMaterial();


// load a resource
loader.load(
	// resource URL
	'../assets/obj/QUAD.obj',
    // called when resource is loaded
    function(object){

        // For any meshes in the model, add our material.
        object.traverse(function ( node ) {
            if (node.isMesh ) {
                node.material = material;
                node.material.side = THREE.DoubleSide;
                node.position.x = 0 - (getCenterPoint(node).x);
                node.position.y = 0 - (getCenterPoint(node).y);
                node.position.z = 0 - (getCenterPoint(node).z);
            }
        });
        // Add the model to the scene.
        scene.add(object);

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
				camera.add( pointLight );
				scene.add( camera );

var controls = new THREE.TrackballControls( camera, renderer.domElement );
controls.minDistance = 0.7;
controls.maxDistance = 3;
camera.position.z = 0.5;
camera.position.x = 0;
camera.position.y = 0;
camera.fov = 120;

animate();


function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( window.innerWidth, window.innerHeight);
    window.addEventListener( 'resize', onWindowResize, false );

    document.getElementById('three-div').appendChild( renderer.domElement )

}

function animate() {
    requestAnimationFrame( animate );

    controls.update();

	renderer.render( scene, camera );
}


function getCenterPoint(mesh) {
    var middle = new THREE.Vector3();
    var geometry = mesh.geometry;

    geometry.computeBoundingBox();

    middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
    middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
    middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;

    return middle;
}