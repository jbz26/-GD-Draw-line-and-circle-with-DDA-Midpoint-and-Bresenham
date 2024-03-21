var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var selectElement = document.getElementById("althogrims");
var width = 800;
var height = 600;
var bgRGBA = [0, 0, 0, 0.88]
var pointRGBA = [0, 0, 255, 255];
var lineRGBA = [0, 0, 0, 255];
var vlineRGBA = [255, 0, 0, 255];

canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
// default
var painter =new PainterDAA(context, width, height);

selectElement.addEventListener('change', function() {
    var selectedAlgorithm = selectElement.value;
    
    // Perform actions based on the selected algorithm
    switch (selectedAlgorithm) {
        case "DDA":
            painter = new PainterDAA(context, width, height);
            var x = 100;
            var y = 100;
            var rgba = [255, 0, 0, 255]; // Red color with full opacity
            painter.setPixel(x, y, rgba);
            break;
        case "bresenham":
            painter = new PainterBresenham(context, width, height);
            var x = 100;
            var y = 100;
            var rgba = [255, 0, 0, 255]; // Red color with full opacity
            painter.setPixel(x, y, rgba);
            // Call a function to switch to Bresenham algorithm
            break;
        case "midpoint":
            painter = new PainterMidpoint(context, width, height);
            console.log("OK");
            console.log(painter.constructor.name);
            var x = 100;
            var y = 100;
            var rgba = [255, 0, 0, 255]; // Red color with full opacity
            painter.setPixel(x, y, rgba);
            break;
        default:
            break;
    }
});

function getPosOnCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return [Math.floor(x - bbox.left * (canvas.width / bbox.width) + 0.5),
    Math.floor(y - bbox.top * (canvas.height / bbox.height) + 0.5)];
}

function doMouseMove(e) {
    if (state == 0 || state == 2) {
        return;
    }
    var p = getPosOnCanvas(e.clientX, e.clientY);
    //painter.drawPoint(p, pointRGBA);

}

function doMouseDown(e) {
    if (state == 2 || e.button != 0) {
        return;
    }
    var p = getPosOnCanvas(e.clientX, e.clientY);
    painter.points.push(p);
    console.log(p,pointRGBA)
    painter.drawPoint(p, pointRGBA);
    console.log(painter.constructor.name)
   if(painter.constructor.name!="PainterMidpoint"){
        if(painter.points.length>1){
            painter.drawLine(painter.points[painter.points.length-2],painter.points[painter.points.length-1], lineRGBA);
        }
        painter.context.putImageData(painter.imageData, 0, 0); // Important!!!!!
    
        if (state == 0) {
            state = 1;
        }
    }
      
    else
    {
        painter.drawCircle(painter.points[painter.points.length-1],lineRGBA);
        painter.context.putImageData(painter.imageData, 0, 0); // Important!!!!!

        if (state == 0) {
            state = 1;
        }
    }
  
}

function doKeyDown(e) {
    if (state == 2) {
        return;
    }
    var keyID = e.keyCode ? e.keyCode : e.which;
    if (keyID == 27 && state == 1) {
        state = 2;
        painter.context.putImageData(painter.imageData, 0, 0); // Important!!!!!
    }
}
var resetButton = document.getElementById("reset");
var state = 0; // Initial state

// Add event listener to the reset button
resetButton.addEventListener('click', function() {
    painter.reset()
    context.clearRect(0, 0, canvas.width, canvas.height);
    state=0
});

// Adding event listeners
canvas.addEventListener('mousemove', doMouseMove);
canvas.addEventListener('mousedown', doMouseDown);
document.addEventListener('keydown', doKeyDown);
