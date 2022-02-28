let renderAll = () => {
    for (obj of allObjects) {
        main(obj);
        for (let i = 0; i < obj.offset; i++) {
            let edge = new Object({
                primitive: gl.TRIANGLE_FAN,
                offset: 4,
                vertex: obj.point[i]
            });
            main(edge);
        }
    }
}

let renderObject = (object) => {
    main(object);
    for (let idx = 0; idx < object.vertex.length; idx += 2) {
        let vert = new Object;
        vert.x = object.vertex[idx];
        vert.y = object.vertex[idx+1];

        edgePoint = getEdgePoint(vert);
        
        let edge = new Object({
            primitive: gl.TRIANGLE_FAN,
            offset: 4,
            vertex: edgePoint
        });

        main(edge);
        points.push(edgePoint);
    }
}