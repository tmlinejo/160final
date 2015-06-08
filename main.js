
var speed = .05
var rotSpeed = .02

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry( 1, 16, 16 );
var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
// create a point light
var pointLight = new THREE.PointLight(0xFFFFFF, 1, 500);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);
camera.position.z = 5;
render();

var keyS = false;
var keyW = false;
var keyA = false;
var keyD = false;
var keyAlt = false;
var key0 = false;
var key1 = false;
var key2 = false;
var key3 = false;
var key4 = false;
var key5 = false;
var key6 = false;
var key7 = false;
var key8 = false;
var key9 = false;

window.addEventListener("keydown", function(event)
{
    if(event.keyCode === 83)
        keyS = true
    if(event.keyCode === 68)
        keyD = true
    if(event.keyCode === 65)
        keyA = true
    if(event.keyCode === 87)
        keyW = true
    if(event.keyCode === 32)
        key5 = true
    if(event.keyCode === 16)
        key0 = true
    if(event.keyCode === 18)
        keyAlt = true
    if(event.keyCode === 96)
        key0 = true
    if(event.keyCode === 97)
        key1 = true
    if(event.keyCode === 98)
        key2 = true
    if(event.keyCode === 99)
        key3 = true
    if(event.keyCode === 100)
        key4 = true
    if(event.keyCode === 101)
        key5 = true
    if(event.keyCode === 102)
        key6 = true
    if(event.keyCode === 103)
        key7 = true
    if(event.keyCode === 104)
        key8 = true
    if(event.keyCode === 105)
        key9 = true
    if(event.keyCode === 27)
        clearAllKeys()
    if(event.keyCode === 13)
        alert([camera.position.x, camera.rotation.x])
    //else alert(event.keyCode)
});
    window.addEventListener("keyup", function(event)
{
    if(event.keyCode === 83)
        keyS = false
    if(event.keyCode === 68)
        keyD = false
    if(event.keyCode === 65)
        keyA = false
    if(event.keyCode === 87)
        keyW = false
    if(event.keyCode === 32)
        key5 = false
    if(event.keyCode === 16)
        key0 = false
    if(event.keyCode === 18)
        keyAlt = false
    if(event.keyCode === 96)
        key0 = false
    if(event.keyCode === 97)
        key1 = false
    if(event.keyCode === 98)
        key2 = false
    if(event.keyCode === 99)
        key3 = false
    if(event.keyCode === 100)
        key4 = false
    if(event.keyCode === 101)
        key5 = false
    if(event.keyCode === 102)
        key6 = false
    if(event.keyCode === 103)
        key7 = false
    if(event.keyCode === 104)
        key8 = false
    if(event.keyCode === 105)
        key9 = false
});

function applyKeyInput()
{
    if(keyA)
    {
        camera.position.x -= speed
        pointLight.position.x -= speed
    }
    if(keyS)
    {
        camera.position.y -= speed
        pointLight.position.y -= speed
    }
    if(keyD)
    {
        camera.position.x += speed
        pointLight.position.x += speed
    }
    if(keyW)
    {
        camera.position.y += speed
        pointLight.position.y += speed
    }
    if(key5)
    {
        camera.position.z -= speed
        pointLight.position.z -= speed
    }
    if(key0)
    {
        camera.position.z += speed
        pointLight.position.z += speed
    }
    if(key1)
    {
        camera.rotation.x -= rotSpeed/Math.sqrt(2);
        camera.rotation.y += rotSpeed/Math.sqrt(2);
    }
    if(key2)
        camera.rotation.x -= rotSpeed;
    if(key3)
    {
        camera.rotation.x -= rotSpeed/Math.sqrt(2);
        camera.rotation.y -= rotSpeed/Math.sqrt(2);
    }
    if(key4)
        camera.rotation.y += rotSpeed;
    if(key6)
        camera.rotation.y -= rotSpeed;
    if(key7)
    {
        camera.rotation.x += rotSpeed/Math.sqrt(2);
        camera.rotation.y += rotSpeed/Math.sqrt(2);
    }
    if(key8)
        camera.rotation.x += rotSpeed;
    if(key9)
    {
        camera.rotation.x += rotSpeed/Math.sqrt(2);
        camera.rotation.y -= rotSpeed/Math.sqrt(2);
    }
    camera.rotation.x = camera.rotation.x % (2*Math.PI);
    camera.rotation.y = camera.rotation.y % (2*Math.PI);
}

function movePlayer(xIn, yIn, zIn)
{
    
}

function clearAllKeys()
{
    keyS = false;
    keyW = false;
    keyA = false;
    keyD = false;
    keyAlt = false;
    key0 = false;
    key1 = false;
    key2 = false;
    key3 = false;
    key4 = false;
    key5 = false;
    key6 = false;
    key7 = false;
    key8 = false;
    key9 = false;
}

function render()
{
    applyKeyInput();
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
//    pointLight.position.z+=1;
}
