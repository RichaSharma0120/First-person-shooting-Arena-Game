// import * as THREE from 'three';

// let scene, camera, renderer, gun, score;
// const obstacles = [];
// const bullets = [];
// let playerDirection = new THREE.Vector3(0, 0, -1); // Initial direction
// let moveForward = false;
// let moveBackward = false;
// let moveLeft = false;
// let moveRight = false;
// let horizontalAngle = 1; // Track horizontal rotation angle
// const PLAYER_HEIGHT = 0.6; // Lowered height from 1.5 to 0.8

// function init() {
//     scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x111111); // Dark background to see yellow bullets better
    
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     // Add lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(5, 10, 7.5);
//     scene.add(directionalLight);

//     score = 0;
//     updateScore();

//     // Create a simple box as the gun model
//     const gunGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.5);
//     const gunMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
//     gun = new THREE.Mesh(gunGeometry, gunMaterial);
//     camera.add(gun); // Add gun to the camera
//     gun.position.set(0.2, -0.2, -1); // Position gun near the camera

//     // Add ground plane
//     const groundGeometry = new THREE.PlaneGeometry(20, 20);
//     const groundMaterial = new THREE.MeshStandardMaterial({ 
//         color: 0x808080, 
//         side: THREE.DoubleSide,
//         roughness: 0.8
//     });
//     const ground = new THREE.Mesh(groundGeometry, groundMaterial);
//     ground.rotation.x = Math.PI / 2;
//     scene.add(ground);

//     // Add obstacles
//     const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
//     const obstacleMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff }); // Blue color
//     for (let i = 0; i < 10; i++) {
//         const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
//         obstacle.position.set(Math.random() * 10 - 5, 0.5, Math.random() * 10 - 5); // Random positions
//         scene.add(obstacle);
//         obstacles.push(obstacle);
//     }

//     // Position camera at lower height
//     camera.position.set(0, PLAYER_HEIGHT, 3); 
//     updateCameraDirection(); // Initialize camera direction
//     scene.add(camera); // Add camera to the scene

//     // Event listeners
//     window.addEventListener('click', shoot);
//     window.addEventListener('mousemove', onMouseMove);
//     window.addEventListener('keydown', onKeyDown);
//     window.addEventListener('keyup', onKeyUp);
    
//     // Lock pointer for smoother controls
//     renderer.domElement.addEventListener('click', () => {
//         renderer.domElement.requestPointerLock();
//     });
    
//     // Add resize event listener
//     window.addEventListener('resize', () => {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     });

//     // Instructions
//     createInstructions();

//     animate();
// }

// function createInstructions() {
//     const instructions = document.createElement('div');
//     instructions.style.position = 'absolute';
//     instructions.style.bottom = '20px';
//     instructions.style.width = '100%';
//     instructions.style.textAlign = 'center';
//     instructions.style.color = 'white';
//     instructions.style.fontSize = '16px';
//     instructions.innerHTML = 'Move: WASD keys | Aim: Mouse (left/right) | Shoot: Click | Click game to lock cursor';
//     document.body.appendChild(instructions);
// }

// function onKeyDown(event) {
//     switch (event.code) {
//         case 'KeyW':
//             moveForward = true;
//             break;
//         case 'KeyS':
//             moveBackward = true;
//             break;
//         case 'KeyA':
//             moveLeft = true;
//             break;
//         case 'KeyD':
//             moveRight = true;
//             break;
//     }
// }

// function onKeyUp(event) {
//     switch (event.code) {
//         case 'KeyW':
//             moveForward = false;
//             break;
//         case 'KeyS':
//             moveBackward = false;
//             break;
//         case 'KeyA':
//             moveLeft = false;
//             break;
//         case 'KeyD':
//             moveRight = false;
//             break;
//     }
// }

// function onMouseMove(event) {
//     if (document.pointerLockElement === renderer.domElement) {
//         // Use movementX for smooth horizontal rotation only
//         const sensitivity = 0.002; // Adjust for sensitivity
//         horizontalAngle -= event.movementX * sensitivity;
//         updateCameraDirection();
//     }
// }

// function updateCameraDirection() {
//     // Set camera rotation only on Y axis (horizontal)
//     camera.rotation.set(0, horizontalAngle, 0);
    
//     // Update player direction based on camera's new rotation
//     playerDirection = new THREE.Vector3(0, 0, -1);
//     playerDirection.applyQuaternion(camera.quaternion);
// }

// function shoot() {
//     // Create a larger, brighter bullet
//     const bulletGeometry = new THREE.SphereGeometry(0.3, 16, 16); // Larger bullet
//     const bulletMaterial = new THREE.MeshPhongMaterial({ 
//         color: 0xffff00,
//         emissive: 0xffff00,
//         emissiveIntensity: 0.5, // Make it glow
//         shininess: 100
//     });
    
//     const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
    
//     // Position bullet at the camera position
//     bullet.position.copy(camera.position);
    
//     // Set bullet direction based on camera's looking direction
//     bullet.direction = playerDirection.clone();
    
//     // Add bullet to scene and bullets array
//     scene.add(bullet);
//     bullets.push(bullet);
// }

// function updatePlayerPosition() {
//     const moveSpeed = 0.1;
    
//     // Get camera's forward and right vectors for movement
//     const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), horizontalAngle);
//     const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), horizontalAngle);
    
//     // Calculate movement direction
//     const direction = new THREE.Vector3(0, 0, 0);
    
//     if (moveForward) direction.add(forward);
//     if (moveBackward) direction.sub(forward);
//     if (moveRight) direction.add(right);
//     if (moveLeft) direction.sub(right);
    
//     // Normalize and apply movement
//     if (direction.length() > 0) {
//         direction.normalize();
        
//         // Update camera position (no player ball anymore)
//         camera.position.x += direction.x * moveSpeed;
//         camera.position.z += direction.z * moveSpeed;
        
//         // Make sure camera stays within the boundaries
//         const boundary = 9; // Keep within ground plane
//         camera.position.x = Math.max(-boundary, Math.min(boundary, camera.position.x));
//         camera.position.z = Math.max(-boundary, Math.min(boundary, camera.position.z));
        
//         // Always maintain the same height
//         camera.position.y = PLAYER_HEIGHT;
//     }
// }

// function updateBullets() {
//     const bulletSpeed = 0.5; // Increased bullet speed for better visibility
    
//     for (let i = bullets.length - 1; i >= 0; i--) {
//         const bullet = bullets[i];
        
//         // Move bullet forward along its direction
//         bullet.position.add(bullet.direction.clone().multiplyScalar(bulletSpeed));
        
//         // Check for collisions with obstacles
//         let hitObstacle = false;
        
//         for (let j = obstacles.length - 1; j >= 0; j--) {
//             const obstacle = obstacles[j];
            
//             if (bullet.position.distanceTo(obstacle.position) < 0.8) { // Slightly larger threshold
//                 scene.remove(obstacle);
//                 obstacles.splice(j, 1);
//                 scene.remove(bullet);
//                 bullets.splice(i, 1);
//                 score += 10;
//                 updateScore();
//                 hitObstacle = true;
//                 break;
//             }
//         }
        
//         if (hitObstacle) continue;
        
//         // Remove bullets that go too far
//         if (bullet.position.distanceTo(camera.position) > 30) {
//             scene.remove(bullet);
//             bullets.splice(i, 1);
//         }
//     }
    
//     // Respawn obstacles if all are gone
//     if (obstacles.length === 0) {
//         respawnObstacles();
//     }
// }

// function respawnObstacles() {
//     const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
//     const obstacleMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff }); // Blue color
    
//     for (let i = 0; i < 10; i++) {
//         const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
//         obstacle.position.set(Math.random() * 16 - 8, 0.5, Math.random() * 16 - 8); // Random positions
//         scene.add(obstacle);
//         obstacles.push(obstacle);
//     }
// }

// function animate() {
//     requestAnimationFrame(animate);
//     updatePlayerPosition();
//     updateBullets();
//     renderer.render(scene, camera);
// }

// function updateScore() {
//     const scoreElement = document.getElementById('score');
//     if (scoreElement) {
//         scoreElement.innerText = `Score: ${score}`;
//     } else {
//         const newScoreElement = document.createElement('div');
//         newScoreElement.id = 'score';
//         newScoreElement.style.position = 'absolute';
//         newScoreElement.style.top = '10px';
//         newScoreElement.style.left = '10px';
//         newScoreElement.style.color = 'white';
//         newScoreElement.style.fontSize = '20px';
//         newScoreElement.innerText = `Score: ${score}`;
//         document.body.appendChild(newScoreElement);
//     }
// }

// window.onload = init;



















import * as THREE from 'three';

let scene, camera, renderer, gun, score;
const obstacles = [];
const bullets = [];
let playerDirection = new THREE.Vector3(0, 0, -1); // Initial direction
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let horizontalAngle = 1; // Track horizontal rotation angle
const PLAYER_HEIGHT = 0.6; // Lowered height from 1.5 to 0.8

// Add crosshair variables
let crosshair;

function init() {
    // Create scene with a better background - dark blue space-like environment
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a20); // Dark blue/purple background
    
    // Add fog for atmosphere and depth
    scene.fog = new THREE.Fog(0x0a0a20, 15, 30);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Dimmer ambient light
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 30;
    scene.add(directionalLight);
    
    // Add point lights for dynamic lighting
    const redLight = new THREE.PointLight(0xff4444, 1, 15);
    redLight.position.set(-5, 2, -5);
    scene.add(redLight);
    
    const blueLight = new THREE.PointLight(0x4444ff, 1, 15);
    blueLight.position.set(5, 2, 5);
    scene.add(blueLight);

    score = 0;
    updateScore();

    // Create a more detailed gun model
    createDetailedGun();

    // Add a textured ground plane
    createGround();

    // Add detailed obstacles
    createObstacles();

    // Position camera at player height
    camera.position.set(0, PLAYER_HEIGHT, 3); 
    updateCameraDirection(); // Initialize camera direction
    scene.add(camera); // Add camera to the scene
    
    // Add crosshair
    createCrosshair();

    // Event listeners
    window.addEventListener('click', shoot);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    
    // Lock pointer for smoother controls
    renderer.domElement.addEventListener('click', () => {
        renderer.domElement.requestPointerLock();
    });
    
    // Add resize event listener
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Enhanced instructions
    createInstructions();

    animate();
}

function createDetailedGun() {
    // Create a more detailed gun model with multiple parts
    const gunGroup = new THREE.Group();
    
    // Gun body
    const gunBodyGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.4);
    const gunMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x222222,
        metalness: 0.7,
        roughness: 0.3
    });
    const gunBody = new THREE.Mesh(gunBodyGeometry, gunMaterial);
    gunGroup.add(gunBody);
    
    // Gun barrel
    const barrelGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8);
    const barrelMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x444444,
        metalness: 0.8, 
        roughness: 0.2
    });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -0.25;
    gunGroup.add(barrel);
    
    // Gun handle
    const handleGeometry = new THREE.BoxGeometry(0.08, 0.15, 0.08);
    const handleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x111111,
        metalness: 0.3,
        roughness: 0.7
    });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.y = -0.1;
    gunGroup.add(handle);
    
    // Gun sight
    const sightGeometry = new THREE.BoxGeometry(0.01, 0.05, 0.05);
    const sightMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const sight = new THREE.Mesh(sightGeometry, sightMaterial);
    sight.position.y = 0.06;
    sight.position.z = -0.1;
    gunGroup.add(sight);
    
    // Position the gun in view
    gunGroup.position.set(0.25, -0.15, -0.5);
    gunGroup.rotation.y = Math.PI / 24; // Slight angle
    
    // Add gun to camera
    gun = gunGroup;
    camera.add(gun);
}

function createGround() {
    // Create a larger, more detailed ground with texture
    const groundSize = 40;
    const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize, 32, 32);
    
    // Add some vertex displacement for terrain effect
    const vertices = groundGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        if (Math.random() > 0.9) {
            vertices[i + 1] = Math.random() * 0.1; // Small bumps
        }
    }
    
    // Create a gradient texture for the ground
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3a7757, // Green-blue tint
        roughness: 0.8,
        metalness: 0.2,
        side: THREE.DoubleSide
    });
    
    // Create grid pattern
    const gridTexture = new THREE.GridHelper(groundSize, 40, 0x444444, 0x444444);
    gridTexture.position.y = 0.01; // Slightly above ground to prevent z-fighting
    scene.add(gridTexture);
    
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
}

function createObstacles() {
    // Create more interesting obstacle geometries
    const obstacleTypes = [
        new THREE.BoxGeometry(1, 1, 1), // Cube
        new THREE.SphereGeometry(0.6, 16, 16), // Sphere
        new THREE.ConeGeometry(0.6, 1.2, 8), // Cone
        new THREE.TetrahedronGeometry(0.8), // Tetrahedron
        new THREE.OctahedronGeometry(0.7) // Octahedron
    ];
    
    // Create obstacles with better materials
    for (let i = 0; i < 10; i++) {
        // Choose random geometry
        const geometry = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        
        // Create glowing neon-like material
        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.7, 0.6); // Random hue with good saturation and brightness
        
        const material = new THREE.MeshStandardMaterial({ 
            color: color,
            emissive: color,
            emissiveIntensity: 0.4,
            metalness: 0.8,
            roughness: 0.2
        });
        
        const obstacle = new THREE.Mesh(geometry, material);
        
        // Position with more height variation
        obstacle.position.set(
            Math.random() * 16 - 8, 
            Math.random() * 0.5 + 0.5, // Varying heights
            Math.random() * 16 - 8
        );
        
        // Add some rotation
        obstacle.rotation.set(
            Math.random() * Math.PI, 
            Math.random() * Math.PI, 
            Math.random() * Math.PI
        );
        
        obstacle.castShadow = true;
        obstacle.receiveShadow = true;
        
        scene.add(obstacle);
        obstacles.push(obstacle);
    }
}

function createCrosshair() {
    // Create a simple crosshair
    const crosshairGeometry = new THREE.RingGeometry(0.01, 0.02, 16);
    const crosshairMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });
    crosshair = new THREE.Mesh(crosshairGeometry, crosshairMaterial);
    crosshair.position.z = -0.5;
    camera.add(crosshair);
}

function createInstructions() {
    // Create a more stylish instruction panel
    const instructions = document.createElement('div');
    instructions.style.position = 'absolute';
    instructions.style.bottom = '20px';
    instructions.style.width = '100%';
    instructions.style.textAlign = 'center';
    instructions.style.color = '#ffffff';
    instructions.style.fontFamily = 'Arial, sans-serif';
    instructions.style.fontSize = '16px';
    instructions.style.padding = '10px';
    instructions.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    instructions.style.borderTop = '2px solid #3a7dff';
    instructions.innerHTML = `
        <strong>CONTROLS:</strong> 
        Move: <span style="color:#3a7dff">W A S D</span> | 
        Aim: <span style="color:#3a7dff">Mouse</span> | 
        Shoot: <span style="color:#3a7dff">Left Click</span> | 
        Click game to begin
    `;
    document.body.appendChild(instructions);
}

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = true;
            break;
        case 'KeyS':
            moveBackward = true;
            break;
        case 'KeyA':
            moveLeft = true;
            break;
        case 'KeyD':
            moveRight = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = false;
            break;
        case 'KeyS':
            moveBackward = false;
            break;
        case 'KeyA':
            moveLeft = false;
            break;
        case 'KeyD':
            moveRight = false;
            break;
    }
}

function onMouseMove(event) {
    if (document.pointerLockElement === renderer.domElement) {
        // Use movementX for smooth horizontal rotation only
        const sensitivity = 0.002; // Adjust for sensitivity
        horizontalAngle -= event.movementX * sensitivity;
        updateCameraDirection();
    }
}

function updateCameraDirection() {
    // Set camera rotation only on Y axis (horizontal)
    camera.rotation.set(0, horizontalAngle, 0);
    
    // Update player direction based on camera's new rotation
    playerDirection = new THREE.Vector3(0, 0, -1);
    playerDirection.applyQuaternion(camera.quaternion);
}

function shoot() {
    // Create a more impressive bullet effect
    const bulletGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const bulletMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffcc00,
        emissive: 0xffcc00,
        emissiveIntensity: 1,
        shininess: 100
    });
    
    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
    
    // Create a glow effect (point light)
    const bulletLight = new THREE.PointLight(0xffcc00, 1, 4);
    bullet.add(bulletLight);
    
    // Position bullet from gun barrel
    bullet.position.copy(camera.position);
    bullet.position.add(playerDirection.clone().multiplyScalar(0.6));
    
    // Set bullet direction based on camera's looking direction
    bullet.direction = playerDirection.clone();
    
    // Add bullet to scene and bullets array
    scene.add(bullet);
    bullets.push(bullet);
    
    // Add muzzle flash effect
    createMuzzleFlash();
    
    // Add recoil effect to gun
    addGunRecoil();
}

function createMuzzleFlash() {
    // Create muzzle flash effect
    const flashGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const flashMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffff88,
        transparent: true,
        opacity: 0.8
    });
    
    const flash = new THREE.Mesh(flashGeometry, flashMaterial);
    
    // Position at gun barrel
    flash.position.set(0.25, -0.15, -0.9);
    camera.add(flash);
    
    // Remove after short time
    setTimeout(() => {
        camera.remove(flash);
    }, 50);
}

function addGunRecoil() {
    // Simple gun recoil animation
    const originalPosition = gun.position.clone();
    
    // Move gun back
    gun.position.z += 0.05;
    
    // Return to original position
    setTimeout(() => {
        gun.position.copy(originalPosition);
    }, 100);
}

function updatePlayerPosition() {
    const moveSpeed = 0.1;
    
    // Get camera's forward and right vectors for movement
    const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), horizontalAngle);
    const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), horizontalAngle);
    
    // Calculate movement direction
    const direction = new THREE.Vector3(0, 0, 0);
    
    if (moveForward) direction.add(forward);
    if (moveBackward) direction.sub(forward);
    if (moveRight) direction.add(right);
    if (moveLeft) direction.sub(right);
    
    // Normalize and apply movement
    if (direction.length() > 0) {
        direction.normalize();
        
        // Update camera position
        camera.position.x += direction.x * moveSpeed;
        camera.position.z += direction.z * moveSpeed;
        
        // Make sure camera stays within the boundaries
        const boundary = 18; // Extended boundary to match ground
        camera.position.x = Math.max(-boundary, Math.min(boundary, camera.position.x));
        camera.position.z = Math.max(-boundary, Math.min(boundary, camera.position.z));
        
        // Add bobbing effect for walking
        if (moveForward || moveBackward || moveLeft || moveRight) {
            const bobAmount = 0.015;
            const bobSpeed = 10;
            camera.position.y = PLAYER_HEIGHT + Math.sin(Date.now() / bobSpeed) * bobAmount;
        } else {
            camera.position.y = PLAYER_HEIGHT;
        }
    }
}

function updateBullets() {
    const bulletSpeed = 0.6; // Slightly faster bullets
    
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        
        // Move bullet forward along its direction
        bullet.position.add(bullet.direction.clone().multiplyScalar(bulletSpeed));
        
        // Check for collisions with obstacles
        let hitObstacle = false;
        
        for (let j = obstacles.length - 1; j >= 0; j--) {
            const obstacle = obstacles[j];
            
            if (bullet.position.distanceTo(obstacle.position) < 0.8) {
                // Create explosion effect
                createExplosion(obstacle.position, obstacle.material.color);
                
                // Remove obstacle and bullet
                scene.remove(obstacle);
                obstacles.splice(j, 1);
                scene.remove(bullet);
                bullets.splice(i, 1);
                
                // Update score with animation
                score += 10;
                updateScore(true);
                
                hitObstacle = true;
                break;
            }
        }
        
        if (hitObstacle) continue;
        
        // Remove bullets that go too far
        if (bullet.position.distanceTo(camera.position) > 30) {
            scene.remove(bullet);
            bullets.splice(i, 1);
        }
    }
    
    // Respawn obstacles if fewer than 5 remain
    if (obstacles.length < 5) {
        respawnObstacles();
    }
}

function createExplosion(position, color) {
    // Create particle explosion
    const particleCount = 20;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.1, 4, 4);
        const particleMaterial = new THREE.MeshBasicMaterial({ 
            color: color,
            transparent: true,
            opacity: 0.8
        });
        
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.copy(position);
        
        // Random velocity
        particle.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.3,
            Math.random() * 0.2,
            (Math.random() - 0.5) * 0.3
        );
        
        scene.add(particle);
        particles.push(particle);
    }
    
    // Add explosion light
    const explosionLight = new THREE.PointLight(color, 2, 3);
    explosionLight.position.copy(position);
    scene.add(explosionLight);
    
    // Animate and remove particles
    let explosionTime = 0;
    const explosionDuration = 30; // frames
    
    function animateExplosion() {
        explosionTime++;
        
        // Update particles
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            particle.position.add(particle.velocity);
            particle.velocity.y -= 0.01; // Gravity
            particle.material.opacity = 1 - (explosionTime / explosionDuration);
            particle.scale.multiplyScalar(0.95); // Shrink particles
        }
        
        // Dim the light
        explosionLight.intensity = 2 * (1 - (explosionTime / explosionDuration));
        
        // Continue animation or clean up
        if (explosionTime < explosionDuration) {
            requestAnimationFrame(animateExplosion);
        } else {
            // Remove all particles
            for (let i = 0; i < particles.length; i++) {
                scene.remove(particles[i]);
            }
            scene.remove(explosionLight);
        }
    }
    
    animateExplosion();
}

function respawnObstacles() {
    // Spawn new obstacles with variety
    const obstacleTypes = [
        new THREE.BoxGeometry(1, 1, 1), // Cube
        new THREE.SphereGeometry(0.6, 16, 16), // Sphere
        new THREE.ConeGeometry(0.6, 1.2, 8), // Cone
        new THREE.TetrahedronGeometry(0.8), // Tetrahedron
        new THREE.OctahedronGeometry(0.7) // Octahedron
    ];
    
    for (let i = 0; i < 5; i++) {
        // Choose random geometry
        const geometry = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        
        // Create glowing neon-like material
        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.7, 0.6); // Random hue
        
        const material = new THREE.MeshStandardMaterial({ 
            color: color,
            emissive: color,
            emissiveIntensity: 0.4,
            metalness: 0.8,
            roughness: 0.2
        });
        
        const obstacle = new THREE.Mesh(geometry, material);
        
        // Make sure obstacles spawn away from player
        let validPosition = false;
        let position = new THREE.Vector3();
        
        while (!validPosition) {
            position.set(
                Math.random() * 30 - 15, 
                Math.random() * 0.5 + 0.5, // Varying heights
                Math.random() * 30 - 15
            );
            
            // Check if far enough from player
            if (position.distanceTo(camera.position) > 5) {
                validPosition = true;
            }
        }
        
        obstacle.position.copy(position);
        
        // Add some rotation
        obstacle.rotation.set(
            Math.random() * Math.PI, 
            Math.random() * Math.PI, 
            Math.random() * Math.PI
        );
        
        obstacle.castShadow = true;
        obstacle.receiveShadow = true;
        
        // Add entrance animation
        obstacle.scale.set(0.1, 0.1, 0.1);
        scene.add(obstacle);
        obstacles.push(obstacle);
        
        // Animate scaling up
        animateObstacleEntrance(obstacle);
    }
}

function animateObstacleEntrance(obstacle) {
    let scaleVal = 0.1;
    const targetScale = 1;
    const scaleSpeed = 0.05;
    
    function grow() {
        if (scaleVal < targetScale) {
            scaleVal += scaleSpeed;
            obstacle.scale.set(scaleVal, scaleVal, scaleVal);
            requestAnimationFrame(grow);
        }
    }
    
    grow();
}

function animate() {
    requestAnimationFrame(animate);
    updatePlayerPosition();
    updateBullets();
    
    // Add dynamic lighting effects
    const time = Date.now() * 0.001;
    const lights = scene.children.filter(obj => obj instanceof THREE.PointLight);
    lights.forEach((light, i) => {
        if (light.color.r > 0.5) { // If it's a red-ish light
            light.intensity = 0.5 + Math.sin(time + i) * 0.3;
        } else {
            light.intensity = 0.5 + Math.cos(time + i) * 0.3;
        }
    });
    
    renderer.render(scene, camera);
}

function updateScore(animate = false) {
    const scoreElement = document.getElementById('score') || createScoreElement();
    
    if (animate) {
        // Animate score change
        scoreElement.style.transform = 'scale(1.5)';
        scoreElement.style.color = '#ffff00';
        setTimeout(() => {
            scoreElement.style.transform = 'scale(1)';
            scoreElement.style.color = '#ffffff';
        }, 300);
    }
    
    scoreElement.innerText = `SCORE: ${score}`;
}

function createScoreElement() {
    const scoreElement = document.createElement('div');
    scoreElement.id = 'score';
    scoreElement.style.position = 'absolute';
    scoreElement.style.top = '20px';
    scoreElement.style.left = '20px';
    scoreElement.style.color = 'white';
    scoreElement.style.fontSize = '24px';
    scoreElement.style.fontFamily = 'Arial, sans-serif';
    scoreElement.style.fontWeight = 'bold';
    scoreElement.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
    scoreElement.style.transition = 'all 0.3s ease';
    scoreElement.innerText = `SCORE: ${score}`;
    document.body.appendChild(scoreElement);
    return scoreElement;
}

window.onload = init;