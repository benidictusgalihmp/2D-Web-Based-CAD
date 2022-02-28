// Define webgl context
let gl = canvas.getContext("webgl");

// Handling if browser does not support WebGL
if (!gl) {
    alert("Your browser does not support WebGL");
}

// Set the viewport
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0, 0, cWidth, cHeight);

/* ################################################## */

// Vertex Shader Src
let vertCode = `
attribute vec3 a_position;
attribute vec3 a_color;
varying vec3 color;
void main(void) {
    gl_Position = vec4(a_position, 1.0);
    color = a_color;
    gl_PointSize = 7.0;
}
`;

// Fragment Shader Src
let fragCode = `
precision mediump float;
varying vec3 color;
void main(void) {
    gl_FragColor = vec4(color, 1.0);
}
`;

let initShader = (type) => {
    let code = (type === gl.VERTEX_SHADER) ? vertCode : fragCode;
    let shader = gl.createShader(type);
    gl.shaderSource(shader, code);
    gl.compileShader(shader);
    return shader;
}

let initProgram = () => {
    let sProgram = gl.createProgram();
    gl.attachShader(sProgram, initShader(gl.VERTEX_SHADER));
    gl.attachShader(sProgram, initShader(gl.FRAGMENT_SHADER));
    gl.linkProgram(sProgram);
    gl.validateProgram(sProgram);
    return sProgram;
}

let main = (object) => {
    let sProgram = initProgram();
    drawObject(sProgram, object);
}

let drawObject = (sProgram, object) => {
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.vertex), gl.STATIC_DRAW);

    let pos = gl.getAttribLocation(sProgram, "a_position");
    let color = gl.getAttribLocation(sProgram, "a_color");

    gl.vertexAttribPointer(pos, 2, gl.FLOAT, gl.FALSE, 0, 0);
    gl.vertexAttribPointer(color, 3, gl.FLOAT, gl.FALSE, 0, 0);
    // 5 * Float32Array.BYTES_PER_ELEMENT

    gl.enableVertexAttribArray(pos);
    gl.enableVertexAttribArray(color);

    gl.useProgram(sProgram);
    gl.drawArrays(object.primitive, 0, object.offset)
}