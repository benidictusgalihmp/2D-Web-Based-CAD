// canvas click listener to get position in the canvas
canvas.addEventListener("mousedown", (e) => {
    let currentPoint = getOnClickPosition(e);

    switch (whichOn()) {
        case "isMoving":
            selectPoint(currentPoint);
            if (pickObject != null) {
                canvas.addEventListener("mouseup", (e) => movePoints(e));

                if(!btnSwitch["isMoving"]) {
                    canvas.removeEventListener("mouseup", (e) => movePoints(e));
                }
            }
            break;
        case "isLine":
            // Wait until 2 times clicked
            if (nPoints < 2) {
                vertices.push(currentPoint.x);
                vertices.push(currentPoint.y);
                nPoints += 1;
                // make sure, other object won't disappeared
                renderAll();
            }
            // Done 2 times clicked
            if (nPoints == 2) {
                console.log(`Creating a Line...`);
                console.log(`vertices: ${vertices}`);
                let line = new Object({
                    primitive: gl.LINES,
                    offset: nPoints,
                    vertex: vertices,
                    point: points,
                    type: "line"
                });

                console.log(`Vertice: ${vertices}`);
                
                renderObject(line);
                allObjects.push(line);
                
                console.log(`All objects: ${allObjects.length}`);
                setAllBtnFalse();
                vertices = [];
                nPoints = 0;
                points = [];
            }
            break;
        case "isSquare":
            console.log(`Creating a Square...`);
            
            // make sure, other object won't disappeared
            renderAll();
            vertices = getFourEdgeSquare(currentPoint);
            console.log(`vertices: ${vertices}`);
            let square = new Object({
                primitive: gl.TRIANGLE_FAN,
                offset: 4,
                vertex: vertices,
                point: points,
                type: "square"
            });
            
            renderObject(square);
            allObjects.push(square);
            console.log(`All objects: ${allObjects.length}`);
            setAllBtnFalse();
            vertices = [];
            points = [];
            break;
        case "isRectangle":
            console.log(`Creating a Square...`);
            
            // make sure, other object won't disappeared
            renderAll();
            vertices = getFourEdgeRectangle(currentPoint);
            console.log(`vertices: ${vertices}`);
            let rectangle = new Object({
                primitive: gl.TRIANGLE_FAN,
                offset: 4,
                vertex: vertices,
                point: points,
                type: "square"
            });
            
            renderObject(rectangle);
            allObjects.push(rectangle);
            console.log(`All objects: ${allObjects.length}`);
            setAllBtnFalse();
            vertices = [];
            points = [];
            break;
            break;
        case "isPolygon":
            // Wait until nPointPolygon times clicked
            if (nPoints < nPointPolygon) {
                vertices.push(currentPoint.x);
                vertices.push(currentPoint.y);
                nPoints += 1;

                // make sure, other object won't disappeared
                renderAll();
            }
            // Done 2 times clicked
            if (nPoints == nPointPolygon) {
                console.log(`Creating a Polygon...`);
                console.log(`vertices: ${vertices}`);
                let polygon = new Object({
                    primitive: gl.TRIANGLE_FAN,
                    offset: nPoints,
                    vertex: vertices,
                    point: points,
                    type: "polygon"
                });
                
                renderObject(polygon);
                allObjects.push(polygon);
                
                console.log(`All objects: ${allObjects.length}`);
                setAllBtnFalse();
                vertices = [];
                nPoints = 0;
                points = [];
            }
            break;  
        case "isEnlargingSquare":
            selectPoint(currentPoint);
            if (pickObject != null) {
                canvas.addEventListener("mouseup", (e) => enlargeSq(e));
            }
            break;

    }
});

/* ################################################## */

let calculate_distance = (x1, y1, x2, y2) =>
    Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2), 2);

let getEdgePoint = (cPos) => [
    cPos.x - 0.02, cPos.y + 0.02,
    cPos.x + 0.02, cPos.y + 0.02,
    cPos.x + 0.02, cPos.y - 0.02,
    cPos.x - 0.02, cPos.y - 0.02
];

let getFourEdgeSquare = (cPos) => [
    cPos.x - 0.1, cPos.y + 0.1,
    cPos.x + 0.1, cPos.y + 0.1,
    cPos.x + 0.1, cPos.y - 0.1,
    cPos.x - 0.1, cPos.y - 0.1
];

let getFourEdgeRectangle = (cPos) => [
    cPos.x - 0.1, cPos.y + 0.3,
    cPos.x + 0.1, cPos.y + 0.3,
    cPos.x + 0.1, cPos.y - 0.1,
    cPos.x - 0.1, cPos.y - 0.1
];

let getOnClickPosition = (e) => {
    // Mid canvas = (0, 0)
    // -1 < x, y < 1
    let rect = canvas.getBoundingClientRect();
    // let x = (2 * (e.clientX - rect.left) - cWidth) / cWidth;
    // let y = -((2 * (e.clientY - rect.top) - cHeight) / cHeight);
    let x = ((e.clientX - rect.left) / cWidth) * 2 - 1;
    let y = -((e.clientY - rect.top) / cHeight) * 2 + 1;

    // current position
    let cPos = new Object;
    cPos.x = x;
    cPos.y = y;
    console.log(`(x, y) = (${cPos.x}, ${cPos.y})`);

    return cPos;
};

let selectPoint = (mousePos) => {
    pickObject = null;
    pickPoint = -999;

    let obj_idx = 0;
    for (obj of allObjects) {
        obj.point.forEach((it, i) => {
            // Click Inside Edge Point
            if (
                (mousePos.x > it[0] && mousePos.y < it[1]) &&
                (mousePos.x < it[2] && mousePos.y < it[3]) &&
                (mousePos.x < it[4] && mousePos.y > it[5]) &&
                (mousePos.x > it[6] && mousePos.y > it[7])
                ) {
                    pickObject = obj;
                    pickPoint = i;
                    console.log(`Pick: ${obj_idx}-${i}`);
            }
        });
        obj_idx++;
    }
}

let movePoints = (e) => {
    cPos = getOnClickPosition(e);

    if (pickObject.type !== "square") {
        pickObject.vertex[pickPoint+1] = cPos.x;
        pickObject.vertex[pickPoint+3] = cPos.y;
        pickObject.point[pickPoint] = getEdgePoint(cPos);

        renderAll();
        setAllBtnFalse();
    }
}
// vertices.splice(0,1, vertices[0] - 0.05);
//         vertices.splice(1,1, vertices[1] + 0.05);
//         vertices.splice(2,1, vertices[2] + 0.05);
//         vertices.splice(3,1, vertices[3] + 0.05);
//         vertices.splice(4,1, vertices[4] + 0.05);
//         vertices.splice(5,1, vertices[5] - 0.05);
//         vertices.splice(6,1, vertices[6] - 0.05);
//         vertices.splice(7,1, vertices[7] - 0.05);

let enlargeSq = (e) => {
    if (pickObject.type == "square") {
        pickObject.vertex[0] += 0.05;
        pickObject.vertex[0] += 0.05;
        pickObject.vertex[0] += 0.05;
        pickObject.vertex[0] += 0.05;
        pickObject.vertex[0] += 0.05;
        pickObject.vertex[0] -= 0.05;
        pickObject.vertex[0] -= 0.05;
        pickObject.vertex[0] -= 0.05;
        console.log("kata2: " + pickObject.vertex);
        renderAll();
        setAllBtnFalse();
    }
}

