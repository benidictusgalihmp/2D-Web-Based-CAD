/* --- Button Handler --- */

let btnSwitch = {
    isMoving: false,
    isLine: false,
    isSquare: false,
    isRectangle: false,
    isPolygon: false,
    isEnlargingSquare: false,
    isShrinkingSquare: false,
};

let whichOn = () => {
    if (btnSwitch["isLine"]) return "isLine";
    else if (btnSwitch["isSquare"]) return "isSquare";
    else if (btnSwitch["isRectangle"]) return "isRectangle";
    else if (btnSwitch["isPolygon"]) return "isPolygon";
    else if (btnSwitch["isMoving"]) return "isMoving";
    else if (btnSwitch["isEnlargingSquare"]) return "isEnlargingSquare";
    else if (btnSwitch["isShrinkingSquare"]) return "isShrinkingSquare";
    else return "All Off";
}

let setDefaultBtn = () => {
    btnMove.setAttribute("value", "Move");
    btnLine.setAttribute("value", "Line");
    btnSquare.setAttribute("value", "Square");
    btnRectangle.setAttribute("value", "Rectangle");
    btnPolygon.setAttribute("value", "Polygon");
    btnEnlargeSq.setAttribute("value", "Perbesar");
    btnShrinkSq.setAttribute("value", "Perkecil");
}

let setAllBtnFalse = () => {
    for (let key in btnSwitch) btnSwitch[key] = false;
    setDefaultBtn();
};

let setBtnOn = (key) => {
    setAllBtnFalse();
    (btnSwitch[key] = true);
}

/**
 * create RGB integer from hex color code
 *
 * @param {hex} hex hex code of color
 * @returns
 */
 function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

/**
 * get float integer of color in RGB format
 *
 * @returns float vector 3 dimensions
 */
function getColor() {
    var color_vec3 = [];
    var color = hexToRgb(document.getElementById("btn_color").value);
    if (color === null) {
        console.log("color is undefined");
        return null;
    }
    color_vec3 = [color.r / 255, color.g / 255, color.b / 255];

    return color_vec3;
}

/**
 * encode the data object from this program into a encoded file
 *
 * @param {string} filename file name that want to download
 * @param {array of object} text save data object from this program
 */
 function download(filename, text) {
    // create tag a in HTML
    var element = document.createElement("a");

    element.setAttribute(
        "href",
        "data:text/plain; charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    // add the element (tag a) into last child HTML
    document.body.appendChild(element);

    element.click();

    // remove the element (tag a)
    document.body.removeChild(element);
}

// Button declaration from HTML
let btnMove = document.getElementById("btn_move");
let btnLine = document.getElementById("btn_line");
let btnSquare = document.getElementById("btn_square");
let btnRectangle = document.getElementById("btn_rectangle");
let btnPolygon = document.getElementById("btn_polygon");
let btnColor = document.getElementById("btn_change_color");
let btnSave = document.getElementById("btn_save");
let btnLoad = document.getElementById("btn_load");
let btnEnlargeSq = document.getElementById("btn_enlargeSq");
let btnShrinkSq = document.getElementById("btn_shrinkSq");

/*** BUTTON ONCLICK HANDLING ***/
btnMove.onclick = (e) => {
    if (btnSwitch["isMoving"]) {
        setAllBtnFalse();
    } else {
        setBtnOn("isMoving");
        btnMove.setAttribute("value", "Stop");
    }
    console.log(`Btn ON: ${whichOn()}`);
};

btnLine.onclick = (e) => {
    if (btnSwitch["isLine"]) {
        setAllBtnFalse();
    } else {
        setBtnOn("isLine");
        btnLine.setAttribute("value", "Stop");
    }
    console.log(`Btn ON: ${whichOn()}`);
};

btnSquare.onclick = (e) => {
    if (btnSwitch["isSquare"]) {
        setAllBtnFalse();
    } else {
        setBtnOn("isSquare");
        btnSquare.setAttribute("value", "Stop");
    }
    console.log(`Btn ON: ${whichOn()}`);
};

btnRectangle.onclick = (e) => {
    if (btnSwitch["isRectangle"]) {
        setAllBtnFalse();
    } else {
        setBtnOn("isRectangle");
        btnRectangle.setAttribute("value", "Stop");
    }
    console.log(`Btn ON: ${whichOn()}`);
};

btnPolygon.onclick = (e) => {
    if (btnSwitch["isPolygon"]) {
        setAllBtnFalse();
    } else {
        setBtnOn("isPolygon");
        btnPolygon.setAttribute("value", "Stop");
        nPointPolygon = parseInt(prompt("Plase input the number of point you want"));
        console.log(`Titik polygon: ${nPointPolygon}`);
    }
    console.log(`Btn ON: ${whichOn()}`);
};

btnColor.onclick = function () {
    let color = hexToRgb(document.getElementById("btn_color").value);
    colors[0] = color[0] / 255;
    colors[1] = color[1] / 255;
    colors[2] = color[2] / 255;
    console.log(`R: ${colors[0]}, G: ${colors[1]}, B: ${colors[2]}`)

    if (pickObject !== null) {
        pickObject.color = color;
    }
};

//perbesar persegi
btnEnlargeSq.onclick = function () {
    if (btnSwitch["isEnlargingSquare"]) {
        setAllBtnFalse();
    } else {
        setBtnOn("isEnlargingSquare");
        btnEnlargeSq.setAttribute("value", "Stop");
    }
    console.log(`Btn ON: ${whichOn()}`);
    
}

//perkecil persegi
btnShrinkSq.onclick = function () {
    // if (vertices.length % 4 == 0){
    //     vertices.splice(0,1, vertices[0] + 0.05);
    //     vertices.splice(1,1, vertices[1] - 0.05);
    //     vertices.splice(2,1, vertices[2] - 0.05);
    //     vertices.splice(3,1, vertices[3] - 0.05);
    //     vertices.splice(4,1, vertices[4] - 0.05);
    //     vertices.splice(5,1, vertices[5] + 0.05);
    //     vertices.splice(6,1, vertices[6] + 0.05);
    //     vertices.splice(7,1, vertices[7] + 0.05);
    //     for (obj of allObjects) {
    //         main(obj);
    //     }
    // }
    
}

btnSave.onclick = (e) => {
    var data = JSON.stringify(allObjects);
    download("data.json", data);
};

btnLoad.onclick = (e) => {
    var file = document.getElementById("btn_load").files[0];
    console.log('get file success')
    let fileReader = new FileReader();
    console.log('FileReader success')
    fileReader.onload = function (e) {
        console.log('File imported')
        allObjects = JSON.parse(e.target.result);
        renderAll();
        console.log('render all success')
    };

    fileReader.readAsText(file);
    console.log("load");
    if (!file) {
        alert("Input a blank file!");
    }
};


