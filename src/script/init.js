// letiable declaration
let allObjects = [];    // Container for All Objects
let vertices = [];      // Array points of vertex 2D [x1, y1, ..., xn, yn]
let colors = [0.0, 0.0, 0.0];
let points = [];

// Variable Handler onSelected
let pickObject = null;     // Object Selected
let pickPoint = null;      // Object Point Selected


// Object Global Attribute
let nPoints = 0;
let nPointPolygon = 0

// DOM manipulation of Canvas
let canvas = document.getElementById("webgl_canvas");

// Get canvas size
let cWidth = canvas.width;
let cHeight = canvas.height;