function PainterBresenham(context, width, height) {
    this.context = context;
    this.imageData = context.createImageData(width, height);
    this.points = [];
    this.now = [-1, -1];
    this.width = width;
    this.height = height;
   
    this.getPixelIndex = function (x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height)
            return -1;
        return (x + y * width) << 2;
    }
    this.setPixel = function(x, y, rgba) {
        var pixelIndex = (x + y * this.width) * 4;
        //console.log(pixelIndex,rgba)
        for (var i = 0; i < 4; i++) {
            this.imageData.data[pixelIndex + i] = rgba[i];
        }
    };
    this.setBackground = function(rgba) {
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                this.setPixel(x, y, rgba);
            }
        }
    };

    this.drawPoint = function (p, rgba) {
        console.log("Drawing point at:", p);
        var x = p[0];
        var y = p[1];
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++)
                this.setPixel(x + i, y + j, rgba);
            
        }
    }

    this.drawLine = function (p0, p1, rgba) {
        var x0 = p0[0], y0 = p0[1];
        var x1 = p1[0], y1 = p1[1];
        var dx = x1 - x0, dy = y1 - y0;
        console.log(x0+ " " + y0 + " " + x1+ " " +y1)
        if (dx == 0 && dy == 0)
            return;
        
        if (Math.abs(dy) <= Math.abs(dx)) {
            if (x0 > x1) {
                var tx = x0; x0 = x1; x1 = tx;
                var ty = y0; y0 = y1; y1 = ty;
                dx = x1 - x0;
                dy = y1 - y0;
                console.log("ok");
            }
            if(y1<y0){
                dy = -dy;
            }
            var p = 2*dy-dx;
            var y = y0;
            var x = x0;
            this.setPixel(x0, y0, rgba);
            for (var x = x0; x <= x1; x++) {
                //console.log(dy + " " + p);
                if(p<0){
                    p = p+2*dy
                }
                else{
                    if(y1<y0){
                        y-=1;
                    }
                    else
                        y+=1;
                    p = p + 2*dy -2*dx
                }
                this.setPixel(x, y, rgba);
            }
            console.log(1);
        } else {
            if (y1 < y0) {
                var tx = x0; x0 = x1; x1 = tx;
                var ty = y0; y0 = y1; y1 = ty;
                dx = x1 - x0;
                dy = y1 - y0;
                console.log("ok2");

            }
            if(x1<x0){
                dx = -dx;
            }
            var p = 2*dx-dy;
            var x = x0;
            var y = y0;
            for (var y = y0; y <= y1; y++) {
                if(p<0){
                    p = p+2*dx;
                }
                else{
                    if(x1<x0){
                        x -=1;
                    }else{
                        x+=1;
                    }
                    
                    p = p + 2*dx -2*dy
                }
                this.setPixel(x, y, rgba);
            }
        }
    }
    this.reset = function() {
        // Clear canvas
        this.context.clearRect(0, 0, this.width, this.height);
        
        // Reset image data
        this.imageData = this.context.createImageData(this.width, this.height);
        
        // Reset points array
        this.points = [];
        
        // Reset other internal state if needed
        this.now = [-1, -1];
    };
}
