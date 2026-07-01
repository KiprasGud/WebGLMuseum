const { mat4, vec3 } = glMatrix;

// ================================
// MAZE LAYOUT - 20 rooms (5 rows x 4 cols)
// Mixed sizes: 3x3 and 2x2
// 0=walkable, 1=wall, 2=light ceiling
// Grid Size: 21 rows x 17 cols
// ================================
const customMazeLayout = [
    // Row 0: Top Wall
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

    // Room Row 1
    [1,0,0,0,1,1,1,1,1,0,0,0,1,0,0,1,1],
    [1,0,2,0,0,0,2,0,0,0,2,0,0,0,2,1,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],

    // Corridor Row 1
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],

    // Room Row 2
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],
    [1,0,2,0,0,0,2,1,1,0,2,0,0,0,2,1,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],

    // Corridor Row 2
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],

    // Room Row 3
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],
    [1,0,2,0,0,0,2,1,1,0,2,0,0,0,2,1,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],

    // Corridor Row 3
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],

    // Room Row 4
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],
    [1,0,2,0,0,0,2,1,1,0,2,0,0,0,2,1,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],

    // Corridor Row 4
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],

    // Room Row 5
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],
    [1,0,2,0,0,0,2,1,1,0,2,0,0,0,2,1,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],

    // Room Row 1
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],
    [1,0,2,0,0,0,2,1,1,0,2,0,0,0,2,1,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],

    // Corridor Row 1
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],

    // Room Row 2
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],
    [1,0,2,0,0,0,2,1,1,0,2,0,0,0,2,1,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],

    // Corridor Row 2
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],

    // Room Row 3
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],
    [1,0,2,0,0,0,2,1,1,0,2,0,0,0,2,1,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],

    // Corridor Row 3
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],

    // Room Row 4
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],
    [1,0,2,0,0,0,2,1,1,0,2,0,0,0,2,1,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],

    // Corridor Row 4
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],

    // Room Row 5
    [1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1],
    [1,0,2,0,0,0,2,1,1,0,2,0,0,0,2,1,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1],
    // Row 20: Bottom Wall
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// ================================
// PROCEDURAL TEXTURE GENERATORS
// ================================
function createProceduralTexture(type, seed) {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d");

    // Seed-based random
    const random = (n) => {
        const x = Math.sin(seed * n) * 10000;
        return x - Math.floor(x);
    };

    switch(type) {
        case 'wood':
            const baseColor = `hsl(${25 + random(1) * 20}, ${40 + random(2) * 30}%, ${30 + random(3) * 20}%)`;
            const grainColor = `hsl(${20 + random(4) * 15}, ${50 + random(5) * 20}%, ${20 + random(6) * 15}%)`;
            ctx.fillStyle = baseColor;
            ctx.fillRect(0, 0, 256, 256);
            for(let i = 0; i < 100; i++) {
                ctx.strokeStyle = grainColor;
                ctx.globalAlpha = 0.1 + random(i) * 0.2;
                ctx.lineWidth = 1 + random(i * 2) * 3;
                ctx.beginPath();
                const y = random(i * 10) * 256;
                ctx.moveTo(0, y);
                ctx.bezierCurveTo(
                    64 + random(i * 11) * 64, y + random(i * 12) * 20 - 10,
                    128 + random(i * 13) * 64, y + random(i * 14) * 20 - 10,
                    256, y + random(i * 15) * 10 - 5
                );
                ctx.stroke();
            }
            break;

        case 'metal':
            const metalBase = 150 + random(1) * 50;
            ctx.fillStyle = `rgb(${metalBase}, ${metalBase}, ${metalBase + 10})`;
            ctx.fillRect(0, 0, 256, 256);
            for(let i = 0; i < 256; i++) {
                ctx.globalAlpha = 0.05 + random(i) * 0.1;
                ctx.strokeStyle = random(i * 2) > 0.5 ? '#fff' : '#000';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(256, i);
                ctx.stroke();
            }
            for(let i = 0; i < 5; i++) {
                const x = random(i * 20) * 256;
                const y = random(i * 21) * 256;
                const grad = ctx.createRadialGradient(x, y, 0, x, y, 40);
                grad.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, 256, 256);
            }
            break;

        case 'stone':
            const stoneBase = `rgb(${120 + random(1) * 40}, ${115 + random(2) * 35}, ${110 + random(3) * 30})`;
            ctx.fillStyle = stoneBase;
            ctx.fillRect(0, 0, 256, 256);
            for(let i = 0; i < 5000; i++) {
                const x = random(i * 10) * 256;
                const y = random(i * 11) * 256;
                const brightness = random(i * 12) * 60 - 30;
                ctx.fillStyle = `rgba(${128 + brightness}, ${128 + brightness}, ${128 + brightness}, 0.3)`;
                ctx.fillRect(x, y, 2, 2);
            }
            for(let i = 0; i < 10; i++) {
                ctx.strokeStyle = `rgba(80, 75, 70, ${0.3 + random(i) * 0.3})`;
                ctx.lineWidth = 1 + random(i * 2) * 2;
                ctx.beginPath();
                let x = random(i * 30) * 256;
                let y = random(i * 31) * 256;
                ctx.moveTo(x, y);
                for(let j = 0; j < 5; j++) {
                    x += (random(i * 32 + j) - 0.5) * 80;
                    y += (random(i * 33 + j) - 0.5) * 80;
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            break;

        case 'fabric':
            const hue = random(1) * 360;
            const sat = 40 + random(2) * 30;
            const light = 40 + random(3) * 30;
            ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`;
            ctx.fillRect(0, 0, 256, 256);
            for(let y = 0; y < 256; y += 4) {
                for(let x = 0; x < 256; x += 4) {
                    const offset = ((y / 4) % 2) * 2;
                    if((x / 4 + offset) % 4 < 2) {
                        ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light + 5}%)`;
                    } else {
                        ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light - 5}%)`;
                    }
                    ctx.fillRect(x, y, 4, 4);
                }
            }
            break;

        case 'marble':
            const marbleHue = random(1) * 60 + 30;
            ctx.fillStyle = `hsl(${marbleHue}, 20%, 85%)`;
            ctx.fillRect(0, 0, 256, 256);
            for(let i = 0; i < 20; i++) {
                ctx.strokeStyle = `hsla(${marbleHue - 10}, 15%, ${40 + random(i) * 30}%, ${0.2 + random(i * 2) * 0.3})`;
                ctx.lineWidth = 1 + random(i * 3) * 4;
                ctx.beginPath();
                let x = random(i * 40) * 256;
                let y = random(i * 41) * 256;
                ctx.moveTo(x, y);
                for(let j = 0; j < 8; j++) {
                    x += (random(i * 42 + j) - 0.5) * 60;
                    y += (random(i * 43 + j) - 0.5) * 60;
                    const cpx = x + (random(i * 44 + j) - 0.5) * 40;
                    const cpy = y + (random(i * 45 + j) - 0.5) * 40;
                    ctx.quadraticCurveTo(cpx, cpy, x, y);
                }
                ctx.stroke();
            }
            break;

        default:
            const color1 = `rgb(${random(1) * 255}, ${random(2) * 255}, ${random(3) * 255})`;
            const color2 = `rgb(${random(4) * 255}, ${random(5) * 255}, ${random(6) * 255})`;
            for(let y = 0; y < 256; y += 32) {
                for(let x = 0; x < 256; x += 32) {
                    ctx.fillStyle = ((x / 32 + y / 32) % 2) ? color1 : color2;
                    ctx.fillRect(x, y, 32, 32);
                }
            }
    }

    ctx.globalAlpha = 1.0;
    return c;
}

// ================================
// ROOM OBJECTS CONFIGURATION
// ================================
const roomObjects = [
    { type: 'obj', modelName: 'car', position: [7.5, 5, 7.5], scale: [2.4, 2.4, 2.4], textureType: 'metal', textureSeed: 1 },
    { type: 'obj', modelName: 'car', position: [18, 0.75, 27.79], scale: [2, 2, 2], textureType: 'wood', textureSeed: 10 },
    { type: 'obj', modelName: 'plane', position: [18, 1.0, 12], scale: [0.001, 0.001, 0.001], textureType: 'wood', textureSeed: 3 },
    { type: 'obj', modelName: 'house', position: [18, 0.7, 38], scale: [1, 1, 1], textureType: 'stone', textureSeed: 4 },
    { type: 'obj', modelName: 'bench', position: [18, 0.15, 50], scale: [0.01, 0.01, 0.01], textureType: 'marble', textureSeed: 5 },
    { type: 'obj', modelName: 'toilet', position: [18, 1, 61.85], scale: [0.09, 0.09, 0.09], textureType: 'metal', textureSeed: 6 },
    { type: 'obj', modelName: 'forklift', position: [18, 0.15, 71], scale: [0.005, 0.005, 0.005], textureType: 'fabric', textureSeed: 9 },
    { type: 'obj', modelName: 'helmet', position: [18, 1.2, 81], scale: [0.05, 0.05, 0.05], textureType: 'wood', textureSeed: 8 },
    { type: 'obj', modelName: 'goal', position: [17, 0.15, 96], scale: [0.005, 0.005, 0.005], textureType: 'stone', textureSeed: 9 },
    { type: 'obj', modelName: 'character', position: [18, 1.5, 108], scale: [0.4, 0.4, 0.4], textureType: 'marble', textureSeed: 10 },
    { type: 'obj', modelName: 'mycar', position: [42, 0.15, 6], scale: [0.5, 0.5, 0.5], textureType: 'wood', textureSeed: 11 },
    { type: 'obj', modelName: 'kompleksas', position: [42, 1, 16], scale: [0.9, 0.9, 0.9], textureType: 'fabric', textureSeed: 12 },
    { type: 'obj', modelName: 'planet', position: [42, 1.2, 28], scale: [1, 1, 1], textureType: 'wood', textureSeed: 13 },
    { type: 'obj', modelName: 'zmogus', position: [42.8, 0.85, 40], scale: [1, 1, 1], textureType: 'stone', textureSeed: 14 },
    { type: 'obj', modelName: 'fifa', position: [42, 0.15, 51], scale: [0.05, 0.05, 0.05], textureType: 'marble', textureSeed: 15 },
    { type: 'obj', modelName: 'box', position: [42, 0.4, 62], scale: [0.8, 0.8, 0.8], textureType: 'metal', textureSeed: 16 },
    { type: 'obj', modelName: 'pik', position: [42, 0.0, 72], scale: [0.5, 0.5, 0.5], textureType: 'fabric', textureSeed: 26 },
];

// ================================
// WEBGL SETUP
// ================================
const canvas = document.getElementById("demo-canvas");
const gl = canvas.getContext("webgl2");
if(!gl) throw new Error("WebGL2 not supported");

function resizeCanvas() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if(canvas.width!==w||canvas.height!==h){
        canvas.width=w; canvas.height=h;
        gl.viewport(0,0,w,h);
    }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
gl.enable(gl.DEPTH_TEST);

// ================================
// SHADERS WITH LIGHTING
// ================================
const vertexShaderSource = `#version 300 es
precision highp float;
in vec3 vertexPosition;
in vec2 vertexTexCoord;
in vec3 vertexNormal;
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
out vec2 vTexCoord;
out vec3 fragWorldPos;
out vec3 vNormal;
void main(){
    vec4 worldPos = model*vec4(vertexPosition,1.0);
    fragWorldPos = worldPos.xyz;
    vTexCoord = vertexTexCoord;
    vNormal = mat3(model) * vertexNormal;
    gl_Position = projection*view*worldPos;
}`;

const fragmentShaderSource = `#version 300 es
precision highp float;
in vec2 vTexCoord;
in vec3 fragWorldPos;
in vec3 vNormal;
uniform sampler2D uTexture;
uniform vec3 cameraPos;
uniform vec3 lightPositions[50];
uniform int numLights;
uniform bool isLightSource;
uniform bool useTexture;
uniform vec3 objectColor;
out vec4 outColor;

void main(){
    vec3 baseColor = useTexture ? texture(uTexture, vTexCoord).rgb : objectColor;
    
    if(isLightSource) {
        outColor = vec4(baseColor * 1.8, 1.0);
        return;
    }
    
    vec3 lighting = vec3(0.3);
    vec3 normal = normalize(vNormal);
    
    for(int i = 0; i < numLights; i++) {
        vec3 lightDir = lightPositions[i] - fragWorldPos;
        float distance = length(lightDir);
        lightDir = normalize(lightDir);
        
        float diff = max(dot(normal, lightDir), 0.0);
        float attenuation = 1.0 / (1.0 + 0.05 * distance + 0.015 * distance * distance);
        
        lighting += vec3(1.0) * diff * attenuation;
    }
    
    lighting = min(lighting, vec3(1.2));
    
    float dist = length(fragWorldPos - cameraPos);
    float fogStart = 45.0, fogEnd = 135.0;
    float fogFactor = clamp((dist - fogStart) / (fogEnd - fogStart), 0.0, 1.0);
    vec3 fogColor = vec3(0.2, 0.2, 0.25);
    
    vec3 litColor = baseColor * lighting;
    outColor = vec4(mix(litColor, fogColor, fogFactor), 1.0);
}`;

function createShader(type, source){
    const sh = gl.createShader(type);
    gl.shaderSource(sh,source);
    gl.compileShader(sh);
    if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(sh));
    return sh;
}
const vs=createShader(gl.VERTEX_SHADER,vertexShaderSource);
const fs=createShader(gl.FRAGMENT_SHADER,fragmentShaderSource);
const program=gl.createProgram();
gl.attachShader(program,vs);
gl.attachShader(program,fs);
gl.linkProgram(program);
gl.useProgram(program);

const posLoc=gl.getAttribLocation(program,"vertexPosition");
const uvLoc=gl.getAttribLocation(program,"vertexTexCoord");
const normalLoc=gl.getAttribLocation(program,"vertexNormal");
const modelLoc=gl.getUniformLocation(program,"model");
const viewLoc=gl.getUniformLocation(program,"view");
const projLoc=gl.getUniformLocation(program,"projection");
const camLoc=gl.getUniformLocation(program,"cameraPos");
const texLoc=gl.getUniformLocation(program,"uTexture");
const lightPosLoc=gl.getUniformLocation(program,"lightPositions");
const numLightsLoc=gl.getUniformLocation(program,"numLights");
const isLightSourceLoc=gl.getUniformLocation(program,"isLightSource");
const useTextureLoc=gl.getUniformLocation(program,"useTexture");
const objectColorLoc=gl.getUniformLocation(program,"objectColor");

// ================================
// CAMERA
// ================================
let cameraPos = vec3.fromValues(7.5, 1.4, 7.5);
let cameraFront = vec3.fromValues(0, 0, 1);
const cameraUp = vec3.fromValues(0, 1, 0);
let yaw = 90;
const sens = 2;
const keys = {};

window.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    e.preventDefault();
});

window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

const lightPositions = [];
for(let r = 0; r < customMazeLayout.length; r++) {
    for(let c = 0; c < customMazeLayout[r].length; c++) {
        if(customMazeLayout[r][c] === 2) {
            lightPositions.push(c * 3 + 1.5, 2.5, r * 3 + 1.5);
        }
    }
}

function isWalkable(x, z) {
    const col = Math.floor(x / 3);
    const row = Math.floor(z / 3);

    if (row < 0 || row >= customMazeLayout.length || col < 0 || col >= customMazeLayout[0].length) {
        return false;
    }

    return customMazeLayout[row][col] !== 1;
}

function updateCamera() {
    const speed = 0.15;
    if(keys["arrowleft"]) yaw -= sens;
    if(keys["arrowright"]) yaw += sens;

    const front = vec3.fromValues(
        Math.cos(yaw * Math.PI / 180),
        0,
        Math.sin(yaw * Math.PI / 180)
    );
    vec3.normalize(cameraFront, front);
    const right = vec3.create();
    vec3.cross(right, cameraFront, cameraUp);
    vec3.normalize(right, right);

    const oldPos = vec3.clone(cameraPos);
    if(keys["w"]) vec3.scaleAndAdd(cameraPos, cameraPos, cameraFront, speed);
    if(keys["s"]) vec3.scaleAndAdd(cameraPos, cameraPos, cameraFront, -speed);
    if(keys["a"]) vec3.scaleAndAdd(cameraPos, cameraPos, right, -speed);
    if(keys["d"]) vec3.scaleAndAdd(cameraPos, cameraPos, right, speed);
    if(!isWalkable(cameraPos[0], cameraPos[2])) vec3.copy(cameraPos, oldPos);
}

// ================================
// MATRICES
// ================================
const projection = mat4.create();
mat4.perspective(projection, Math.PI / 3, canvas.width / canvas.height, 0.1, 300.0);
const view = mat4.create(), model = mat4.create();
function updateView() {
    const target = vec3.create();
    vec3.add(target, cameraPos, cameraFront);
    mat4.lookAt(view, cameraPos, target, cameraUp);
}

// ================================
// OBJ FILE LOADER
// ================================
function parseOBJ(objText) {
    const vertices = [];
    const uvs = [];
    const normalsOut = [];

    const lines = objText.split('\n');
    const tempPositions = [];
    const tempTexCoords = [];
    const tempNormals = [];

    for(const line of lines) {
        const parts = line.trim().split(/\s+/);
        if(parts[0] === 'v') {
            tempPositions.push([parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])]);
        } else if(parts[0] === 'vt') {
            tempTexCoords.push([parseFloat(parts[1]), parseFloat(parts[2])]);
        } else if(parts[0] === 'vn') {
            tempNormals.push([parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])]);
        } else if(parts[0] === 'f') {
            const faceVertices = [];
            for(let i = 1; i < parts.length; i++) {
                const indices = parts[i].split('/');
                faceVertices.push({
                    v: parseInt(indices[0]) - 1,
                    vt: indices[1] ? parseInt(indices[1]) - 1 : -1,
                    vn: indices[2] ? parseInt(indices[2]) - 1 : -1
                });
            }

            for(let i = 1; i < faceVertices.length - 1; i++) {
                [faceVertices[0], faceVertices[i], faceVertices[i + 1]].forEach(fv => {
                    vertices.push(...tempPositions[fv.v]);
                    if(fv.vt >= 0 && tempTexCoords[fv.vt]) {
                        uvs.push(...tempTexCoords[fv.vt]);
                    } else {
                        uvs.push(0, 0);
                    }
                    if(fv.vn >= 0 && tempNormals[fv.vn]) {
                        normalsOut.push(...tempNormals[fv.vn]);
                    } else {
                        normalsOut.push(0, 1, 0);
                    }
                });
            }
        }
    }

    return {
        positions: new Float32Array(vertices),
        uvs: new Float32Array(uvs),
        normals: new Float32Array(normalsOut)
    };
}

// ================================
// GEOMETRY WITH NORMALS
// ================================
function addCubeWithNormals(posArray, uvArray, normalArray, x, z, w, d, h) {
    const x0 = x, x1 = x + w, y0 = 0, y1 = h, z0 = z, z1 = z + d;
    const uv = [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1];

    const faces = [
        {pos: [x0, y0, z1, x1, y0, z1, x1, y1, z1, x0, y0, z1, x1, y1, z1, x0, y1, z1], norm: [0, 0, 1]},
        {pos: [x1, y0, z0, x0, y0, z0, x0, y1, z0, x1, y0, z0, x0, y1, z0, x1, y1, z0], norm: [0, 0, -1]},
        {pos: [x0, y0, z0, x0, y0, z1, x0, y1, z1, x0, y0, z0, x0, y1, z1, x0, y1, z0], norm: [-1, 0, 0]},
        {pos: [x1, y0, z1, x1, y0, z0, x1, y1, z0, x1, y0, z1, x1, y1, z0, x1, y1, z1], norm: [1, 0, 0]},
        {pos: [x0, y1, z0, x0, y1, z1, x1, y1, z1, x0, y1, z0, x1, y1, z1, x1, y1, z0], norm: [0, 1, 0]},
        {pos: [x0, y0, z0, x1, y0, z0, x1, y0, z1, x0, y0, z0, x1, y0, z1, x0, y0, z1], norm: [0, -1, 0]}
    ];
    for (const f of faces) {
        posArray.push(...f.pos);
        uvArray.push(...uv);
        for (let i = 0; i < 6; i++) normalArray.push(...f.norm);
    }
}

function createMazeWalls(layout) {
    const positions = [], uvs = [], normals = [];
    for(let r = 0; r < layout.length; r++)
        for(let c = 0; c < layout[r].length; c++)
            if(layout[r][c] === 1) addCubeWithNormals(positions, uvs, normals, c * 3, r * 3, 3, 3, 2.8);
    return {positions: new Float32Array(positions), uvs: new Float32Array(uvs), normals: new Float32Array(normals)};
}
function createFloor(layout) {
    const positions = [], uvs = [], normals = [];
    for(let r = 0; r < layout.length; r++) {
        for(let c = 0; c < layout[r].length; c++) {
            if(layout[r][c] === 0 || layout[r][c] === 2) {
                const x = c * 3, z = r * 3;
                positions.push(x,0,z, x+3,0,z, x+3,0,z+3, x,0,z, x+3,0,z+3, x,0,z+3);
                uvs.push(0,0, 1,0, 1,1, 0,0, 1,1, 0,1);
                for(let i = 0; i < 6; i++) normals.push(0, 1, 0);
            }
        }
    }
    return {positions: new Float32Array(positions), uvs: new Float32Array(uvs), normals: new Float32Array(normals)};
}
function createCeiling(layout, isLight) {
    const positions = [], uvs = [], normals = [];
    for(let r = 0; r < layout.length; r++) {
        for(let c = 0; c < layout[r].length; c++) {
            if((isLight && layout[r][c] === 2) || (!isLight && (layout[r][c] === 0))) {
                const x = c * 3, z = r * 3;
                positions.push(x,2.8,z, x,2.8,z+3, x+3,2.8,z+3, x,2.8,z, x+3,2.8,z+3, x+3,2.8,z);
                uvs.push(0,0, 0,1, 1,1, 0,0, 1,1, 1,0);
                for(let i = 0; i < 6; i++) normals.push(0, -1, 0);
            }
        }
    }
    return {positions: new Float32Array(positions), uvs: new Float32Array(uvs), normals: new Float32Array(normals)};
}
function createTextureFromCanvas(c) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    return tex;
}
function createWallTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#6b4a3b";
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = "#8b5a4b";
    ctx.lineWidth = 3;
    for(let y = 0; y < 256; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(256, y);
        ctx.stroke();
        const off = (y / 32 % 2) * 16;
        for(let x = -off; x < 256; x += 64) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + 32);
            ctx.stroke();
        }
    }
    return c;
}
function createFloorTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#4a4a4a";
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = "#5a5a5a";
    ctx.lineWidth = 2;
    for(let i = 0; i < 256; i += 64) {
        for(let j = 0; j < 256; j += 64) {
            ctx.strokeRect(i, j, 64, 64);
        }
    }
    return c;
}
function createCeilingTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#e0e0e0";
    ctx.fillRect(0, 0, 256, 256);
    return c;
}
function createLightTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d");
    const gradient = ctx.createRadialGradient(128, 128, 30, 128, 128, 128);
    gradient.addColorStop(0, "#ffffaa");
    gradient.addColorStop(0.5, "#ffff88");
    gradient.addColorStop(1, "#ffff66");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return c;
}
const wallTex = createTextureFromCanvas(createWallTexture());
const floorTex = createTextureFromCanvas(createFloorTexture());
const ceilingTex = createTextureFromCanvas(createCeilingTexture());
const lightTex = createTextureFromCanvas(createLightTexture());
const proceduralTextures = {};
function createBufferObj(positions, uvs, normals) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

    const normBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normBuf);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(normalLoc);
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);

    return {vao, count: positions.length / 3};
}

const wallData = createMazeWalls(customMazeLayout);
const wallObj = createBufferObj(wallData.positions, wallData.uvs, wallData.normals);
const floorData = createFloor(customMazeLayout);
const floorObj = createBufferObj(floorData.positions, floorData.uvs, floorData.normals);
const ceilingData = createCeiling(customMazeLayout, false);
const ceilingObj = createBufferObj(ceilingData.positions, ceilingData.uvs, ceilingData.normals);
const lightCeilingData = createCeiling(customMazeLayout, true);
const lightCeilingObj = createBufferObj(lightCeilingData.positions, lightCeilingData.uvs, lightCeilingData.normals);
const loadedModels = {};
async function loadOBJFile(filepath, modelName) {
    try {
        const response = await fetch(filepath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filepath}: ${response.statusText}`);
        }
        const objText = await response.text();
        const modelData = parseOBJ(objText);
        loadedModels[modelName] = createBufferObj(modelData.positions, modelData.uvs, modelData.normals);
        return true;
    } catch (error) {
        console.error(Error `loading ${filepath}:, error`);
        return false;
    }
}
async function initializeModels() {
    await loadOBJFile('Obj files/planeta.obj', 'planet');
    await loadOBJFile('Obj files/namas.obj', 'house');
    await loadOBJFile('Obj files/masina.obj', 'car');
    await loadOBJFile('Obj files/plane.obj', 'plane');
    await loadOBJFile('Obj files/Bench_LowRes.obj', 'bench');
    await loadOBJFile('Obj files/characterlowpoly2.obj', 'character');
    await loadOBJFile('Obj files/football goal.obj', 'goal');
    await loadOBJFile('Obj files/toilet.obj', 'toilet');
    await loadOBJFile('Obj files/forklift.obj', 'forklift');
    await loadOBJFile('Obj files/helmet.obj', 'helmet');
    await loadOBJFile('Obj files/kompleksas.obj', 'kompleksas');
    await loadOBJFile('Obj files/mycar.obj', 'mycar');
    await loadOBJFile('Obj files/zmogus.obj', 'zmogus');
    await loadOBJFile('Obj files/cow.obj', 'cow');
    await loadOBJFile('Obj files/Pikachu OBJ.obj', 'pik');
    await loadOBJFile('Obj files/PenguinBaseMesh.obj', 'peng');
    await loadOBJFile('Obj files/box.obj', 'box');
    await loadOBJFile('Obj files/fifa.obj', 'fifa');

    for (const obj of roomObjects) {
        if (obj.textureType && obj.textureSeed) {
            const key = `${obj.textureType}_${obj.textureSeed}`;
            if (!proceduralTextures[key]) {
                const canvas = createProceduralTexture(obj.textureType, obj.textureSeed);
                proceduralTextures[key] = createTextureFromCanvas(canvas);
            }
        }
    }

    render();
}

function render() {
    resizeCanvas();
    updateCamera();
    updateView();
    gl.clearColor(0.2, 0.2, 0.25, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(projLoc, false, projection);
    gl.uniformMatrix4fv(viewLoc, false, view);
    gl.uniform3f(camLoc, cameraPos[0], cameraPos[1], cameraPos[2]);
    gl.uniform3fv(lightPosLoc, lightPositions);
    gl.uniform1i(numLightsLoc, lightPositions.length / 3);

    function drawObj(obj, tex, isLight = false, modelMatrix = model) {
        gl.bindVertexArray(obj.vao);
        gl.uniformMatrix4fv(modelLoc, false, modelMatrix);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.uniform1i(texLoc, 0);
        gl.uniform1i(isLightSourceLoc, isLight ? 1 : 0);
        gl.uniform1i(useTextureLoc, 1);
        gl.drawArrays(gl.TRIANGLES, 0, obj.count);
    }

    function drawColoredObj(obj, color, modelMatrix) {
        gl.bindVertexArray(obj.vao);
        gl.uniformMatrix4fv(modelLoc, false, modelMatrix);
        gl.uniform1i(isLightSourceLoc, 0);
        gl.uniform1i(useTextureLoc, 0);
        gl.uniform3fv(objectColorLoc, color);
        gl.drawArrays(gl.TRIANGLES, 0, obj.count);
    }

    drawObj(wallObj, wallTex);
    drawObj(floorObj, floorTex);
    drawObj(ceilingObj, ceilingTex);
    drawObj(lightCeilingObj, lightTex, true);

    for (const obj of roomObjects) {
        const objModel = mat4.create();
        mat4.translate(objModel, objModel, obj.position);
        mat4.scale(objModel, objModel, obj.scale);

        const texKey = `${obj.textureType}_${obj.textureSeed}`;
        const objTexture = proceduralTextures[texKey];

        if (obj.type === 'obj' && loadedModels[obj.modelName]) {
            if (objTexture) {
                drawObj(loadedModels[obj.modelName], objTexture, false, objModel);
            } else {
                drawColoredObj(loadedModels[obj.modelName], obj.color || [0.8, 0.8, 0.8], objModel);
            }
        }
    }

    requestAnimationFrame(render);
}


initializeModels();
