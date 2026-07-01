# WebGL 3D Museum

A first-person 3D museum experience built entirely from scratch using WebGL2 and JavaScript. The project features custom maze layout, dynamic lighting, custom `.obj` model loading, and algorithmically generated textures.

<div align="center">
  <img width="671" height="535" alt="museumhigh-ezgif com-optimize" src="https://github.com/user-attachments/assets/9bc19c33-1461-4cc0-8544-4c930688aa57" />
</div>

[Try it here](https://kiprasgud.github.io/WebGLMuseum/)


## Controls

* **W:** Move Forward
* **S:** Move Backward
* **A:** Strafe Left
* **D:** Strafe Right
* **Left / Right Arrow Keys:** Rotate Camera


## Features

* **Procedural Textures:** Dynamically generated textures via HTML5 Canvas (Wood, Metal, Stone, Fabric, Marble) applied to 3D objects.
* **Model Loading:** An asynchronous custom `.obj` parser to load standard 3D mesh files into the environment.
* **First-Person Navigation:** Interactive WASD camera with basic wall collision detection.
* **Dynamic Lighting & Fog:** Implements custom vertex and fragment shaders for point light attenuation and distance-based fog.

## Project Structure

* `index.html`: The main entry point containing the UI canvas.
* `index.js`: The core application logic, containing the maze layout, procedural texture generation, camera controls, shader compilation, and the render loop.
* `gl-matrix.js`: External library used for handling 3D vectors and matrices.
* `Obj files/`: Directory containing all the 3D models used to populate the museum rooms.

## Installation & Setup

1. Clone this repository to your local machine.
2. Ensure you have an `Obj files/` directory in the root folder containing the required `.obj` files (e.g., `masina.obj`, `planeta.obj`, `namas.obj`).
3. Start your local web server in the root directory.
4. Open your browser and navigate to `http://localhost:8000` (or whichever port your server uses).
