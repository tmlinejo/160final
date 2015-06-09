
var size = 15
var speed = .2
var rotSpeed = .06
var boxSize = 3
var lightIntensity = 2

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry
var material
var walls = []
var count = 0
var goal
var maze

generateMaze()



/*
var geometry = new THREE.SphereGeometry( 30, 16, 16 );
var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
material.side = THREE.BackSide
var rooms = []
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );



for(var i=0; i<20; i++)
{
    var radTemp = 4*Math.random()
    rooms[i] = new room((Math.random() - .5) * 30,(Math.random() - .5) *2 * radTemp,(Math.random() - .5) * 30, radTemp, 30)
    scene.add(rooms[i].form)

    geometry = new THREE.SphereGeometry(2*Math.random(), 16, 16)
    material = new THREE.MeshLambertMaterial( { color: Math.ceil(16777215*Math.random()) } );
    cube[i] = new THREE.Mesh(geometry, material);
    cube[i].position.x = (Math.random() - .5) * 10
    cube[i].position.y = (Math.random() - .5) * 10
    cube[i].position.z = (Math.random() - .5) * 10
    scene.add(cube[i])
}*/

var pointLight = new THREE.PointLight(0xFFFFFF, lightIntensity, 20);
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;
scene.add(pointLight);

render();


var kBack = false;
var kFore = false;
var kLeft = false;
var kRigh = false;
var keyAlt = false;
var leftMouse = false;
var rightMouse = false;
var prevx = 0
var prevy = 0
var cheatUp = false
var cheatDown = false

window.addEventListener("mousewheel", function(event)
{
    pointLight.intensity += event.wheelDelta / (Math.abs(event.wheelDelta)*20)
});

window.addEventListener("contextmenu", function(event) { event.preventDefault();}); // prevent right click menu
window.addEventListener("mousedown", function(event)
{
    if(event.button === 0) // left click
        leftMouse = true
    if(event.button === 2) // right click
        rightMouse = true
    prevx = event.clientX
});
window.addEventListener("mouseup", function(event)
{
    if(event.button === 0) // left unclick
        leftMouse = false
    if(event.button === 1)
        pointLight.intensity = lightIntensity; 
    if(event.button === 2) // right unclick
        rightMouse = false
});
window.addEventListener("mousemove", function(event)
{
    if(rightMouse)
    {
        var movex = event.clientX - prevx
        camera.rotation.y -= movex / 200
    }
    prevx = event.clientX
    prevy = event.clientY
});

window.addEventListener("keydown", function(event)
{
    if(event.keyCode === 38)
        kFore = true
    if(event.keyCode === 40)
        kBack = true
    if(event.keyCode === 37)
        kLeft = true
    if(event.keyCode === 39)
        kRigh = true
    if(event.keyCode === 83)
        kBack = true
    if(event.keyCode === 68)
        kRigh = true
    if(event.keyCode === 65)
        kLeft = true
    if(event.keyCode === 87)
        kFore = true
    if(event.keyCode === 32)
        kFore = true
    if(event.keyCode === 16)
        kBack = true
    if(event.keyCode === 18)
        keyAlt = true
    if(event.keyCode === 96)
        kBack = true
    if(event.keyCode === 79)
        cheatDown = true
    if(event.keyCode === 80)
        cheatUp = true
    if(event.keyCode === 27)
        clearAllKeys()
    if(event.keyCode === 13)
        alert([Math.floor(camera.position.x/boxSize),Math.floor(camera.position.z/boxSize),maze[Math.floor(camera.position.x/boxSize)][Math.floor(camera.position.z/boxSize)]])
    //else alert(event.keyCode)
});
    window.addEventListener("keyup", function(event)
{
    if(event.keyCode === 38)
        kFore = false
    if(event.keyCode === 40)
        kBack = false
    if(event.keyCode === 37)
        kLeft = false
    if(event.keyCode === 39)
        kRigh = false
    if(event.keyCode === 83)
        kBack = false
    if(event.keyCode === 68)
        kRigh = false
    if(event.keyCode === 65)
        kLeft = false
    if(event.keyCode === 87)
        kFore = false
    if(event.keyCode === 32)
        kFore = false
    if(event.keyCode === 16)
        kBack = false
    if(event.keyCode === 18)
        keyAlt = false
    if(event.keyCode === 96)
        kBack = false
    if(event.keyCode === 79)
        cheatDown = false
    if(event.keyCode === 80)
        cheatUp = false
});

function applyKeyInput()
{
    if(kFore || leftMouse)
    {
        moveForward(-speed);
        //camera.position.z -= speed
        //pointLight.position.z -= speed
    }
    if(kBack)
    {
        moveForward(speed);
        //camera.position.z += speed
        //pointLight.position.z += speed
    }
    if(kLeft)
        camera.rotation.y += rotSpeed
    if(kRigh)
        camera.rotation.y -= rotSpeed
    if(keyAlt && cheatUp)
        camera.position.y += speed
    if(keyAlt && cheatDown)
        camera.position.y -= speed
    
    camera.rotation.x = camera.rotation.x % (2*Math.PI);
    camera.rotation.y = camera.rotation.y % (2*Math.PI);
}

function moveForward(dist)
{
    var xR = camera.rotation.x
    var yR = camera.rotation.y
    var z = dist*Math.cos(xR)*Math.cos(yR)
    var y = dist*Math.sin(xR)
    var x = dist*Math.cos(xR)*Math.sin(yR)
    
    if(isSpaceClear(camera.position.x + (x), camera.position.y+(y), camera.position.z+(z)))
    {
        camera.position.x += x
        camera.position.y += y
        camera.position.z += z
        pointLight.position.x += x
        pointLight.position.y += y
        pointLight.position.z += z
    }
    
}

function isSpaceClear(xIn, yIn, zIn)
{
    if (maze[Math.floor(xIn/boxSize)][Math.floor(zIn/boxSize)] == 3)
    {
        clearAllKeys()
        generateMaze()
    }
    if(keyAlt || ((maze[Math.floor(xIn/boxSize)][Math.floor(zIn/boxSize)] != 1) && (maze[Math.floor(xIn/boxSize)][Math.floor(zIn/boxSize)] != 4)))
        return true
    else
        return false
}

function clearAllKeys()
{
    kBack = false;
    kFore = false;
    kLeft = false;
    kRigh = false;
    keyAlt = false;
    leftMouse = false;
    rightMouse = false;
}

function render()
{
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    applyKeyInput();
    pointLight.position.x = camera.position.x
    pointLight.position.y = camera.position.y
    pointLight.position.z = camera.position.z
    goal.material.color.setRGB(Math.random(),Math.random(),Math.random())
}

function generateMaze()
{
    for(var i=0; i<count; i++)
    {
        scene.remove(walls[i])
    }
    scene.remove(goal)
    count = 0
    maze = []
    for(var i=0; i<size; i++)
    {
        maze[i] = []
        for(var j=0; j<size; j++)
            maze[i][j] = 1
        maze[i][0] = 4
        maze[i][size-1] = 4
    }
    for(var i=0; i<size; i++)
    {
        maze[0][i] = 4
        maze[size-1][i] = 4
    }
    var tempX = Math.floor(Math.random()*(size-2))+1;
    var tempY = Math.floor(Math.random()*(size-2))+1;
    maze[tempX][tempY] = 2;
    while(maze[tempX][tempY]!=3)
    {
        var moves = []
        if(maze[tempX-1][tempY]==1)
            moves.push([-1,0])
        if(maze[tempX+1][tempY]==1)
            moves.push([1,0])
        if(maze[tempX][tempY-1]==1)
            moves.push([0,-1])
        if(maze[tempX][tempY+1]==1)
            moves.push([0,1]);
        if(moves.length==0) // out of moves
            maze[tempX][tempY] = 3
        else // found a move
        {
            var move = Math.floor(Math.random()*(moves.length))
            if(maze[tempX-1][tempY]==1)
                maze[tempX-1][tempY] = 4
            if(maze[tempX+1][tempY]==1)
                maze[tempX+1][tempY] = 4
            if(maze[tempX][tempY-1]==1)
                maze[tempX][tempY-1] = 4
            if(maze[tempX][tempY+1]==1)
                maze[tempX][tempY+1] = 4
            tempX += moves[move][0]
            tempY += moves[move][1]
            maze[tempX][tempY] = 0
        }
        
    }
    for(var i=1; i<(size-1); i++)
    {
        for(var j=1; j<(size-1); j++)
        {
            if((Math.random()<.5)&&((maze[i][j]==4)||(maze[i][j]==1)))
            {
                maze[i][j] = 0;
            }
        }
    }
    for(var i=0; i<maze.length; i++)
    {
        for(var j=0; j<maze.length; j++)
        {
            if((maze[i][j] == 1) || (maze[i][j] == 4))
            {
                geometry = new THREE.BoxGeometry(boxSize,boxSize,boxSize)
                material = new THREE.MeshLambertMaterial({color: Math.ceil(16777215*Math.random()) } );
                walls[count] = new THREE.Mesh(geometry, material);
                scene.add(walls[count])
                walls[count].position.x = (i+speed)*boxSize
                walls[count].position.y = 0
                walls[count].position.z = (j+speed)*boxSize
                count++
            }
            if(maze[i][j] == 2)
            {
                camera.position.x = (i+.5)*boxSize
                camera.position.z = (j+.5)*boxSize
            }
            if(maze[i][j] == 3)
            {
                geometry = new THREE.SphereGeometry(boxSize/3, 20, 20)
                material = new THREE.MeshLambertMaterial({color: Math.ceil(16777215*Math.random()) } );
                goal = new THREE.Mesh(geometry, material);
                scene.add(goal)
                goal.position.x = (i)*boxSize
                goal.position.y = 0
                goal.position.z = (j)*boxSize
            }
        }
    }
}
