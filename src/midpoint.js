function PainterMidpoint(context, width, height) {
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

    this.drawCircle = function (p0, rgba) { //Draw circle
        var x0 = 0, y0 = 100; // r = 100
        var f = 1 - 100;
        while (x0<y0){
            this.setPixel(x0+p0[0], y0+p0[1], rgba);
            this.setPixel(-x0+p0[0], y0+p0[1], rgba);
            this.setPixel(-x0+p0[0], -y0+p0[1], rgba);
            this.setPixel(x0+p0[0], -y0+p0[1], rgba);
            this.setPixel(y0+p0[0], x0+p0[1], rgba);
            this.setPixel(y0+p0[0], -x0+p0[1], rgba);
            this.setPixel(-y0+p0[0], -x0+p0[1], rgba);
            this.setPixel(-y0+p0[0], x0+p0[1], rgba);

            console.log("Drawing point at:" + x0+ " " +  y0)
            if(f<0){
                f = f + 2*x0+3;
                x0 +=1;
            }
            else{
                f = f + 2*x0 - 2*y0+5;
                x0+=1;
                y0-=1;
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
