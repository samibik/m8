window.onload = function(){
    
    var seed = {
        x: (2147483648 * Math.random()) | 0,
        y: (2147483648 * Math.random()) | 0,
        z: (2147483648 * Math.random()) | 0,
        w: (2147483648 * Math.random()) | 0
    };
    function randomInt(xors) {
        var t = xors.x ^ (xors.x << 11);
        xors.x = xors.y;
        xors.y = xors.z;
        xors.z = xors.w;
        return xors.w = (xors.w^(xors.w>>>19))^(t^(t>>>8));
    }
    function random(xors) {
        return randomInt(xors) / 2147483648;
    }
    function shuffle(xs){
        var v = Object.assign({}, seed);
        var xs = xs.slice();
        var ys = [];
        while(0 < xs.length){
            var i = Math.abs(randomInt(v)) % xs.length;
            ys.push(xs[i]);
            xs.splice(i, 1);
        }
        return ys;
    }

    var colorTuples = shuffle([
        ["gold", "gold"], 
        
    ]);

      var topColors = ["#04ad8f", "#a6ce48", "#f3a118", "#ea6435", "#17b297", "#e30983", "#2782c4", "#1aa6e7", "#b5b5b5", "#f29905", "#e50011", "#ccdc26", "#a5328d", "#0aaa60", "#91c423", "#f29300", "#ec5f69", "#22b69e", "#e63e9b", "#917220"];


    var topInput = document.querySelector("#top");
    var middleInput = document.querySelector("#middle");
    var bottomInput = document.querySelector("#bottom"); 

    var top = document.querySelector(".top");
    var middle = document.querySelector(".middle");
    var bottom = document.querySelector(".bottom");

    var foreground = document.getElementById("foreground");
    var image = document.getElementById("result");
	
    
    var container = document.querySelector(".container");
    var download = document.getElementById("download");

    var canvas = document.createElement("canvas");
    var g = canvas.getContext("2d");
	
	
	    
        


    function update(){
        setTimeout(function(){
            setText(topInput.value, middleInput.value, bottomInput.value);
        });
    }      
    middleInput.addEventListener("change", update);
    middleInput.addEventListener("keydown", update);    
    topInput.addEventListener("change", update);
    topInput.addEventListener("keydown", update);  
    bottomInput.addEventListener("change", update);
    bottomInput.addEventListener("keydown", update);        

    function setText(topText, middleText, bottomText){


        

        var topTextSize = 70;
        var topMiddlePadding = 30;
        var middleTextSize = 120;
        var middleBottomPadding = 20;        
        var bottomTextSize = 30;
        var margin = 60;
        var bottomTextLetterSpacing = 20;

        var topTextFont = `normal bold ${topTextSize}px/2 "Kitab"`;
        var middleTextFont = `normal 400 ${middleTextSize}px/2 IBM Plex Sans Arabic`;
        var bottomTextFont = `normal bold  ${bottomTextSize}px/2 Kitab`;

        // resize canvas
		
        g.font = topTextFont;
        var topMetrics = g.measureText(topText);
        g.font = middleTextFont;
        var middleMetrics = g.measureText(middleText);  
        g.font = bottomTextFont;
        var bottomMetrics = g.measureText(bottomText);  
        canvas.width = margin + Math.max(
            topMetrics.width, 
            middleMetrics.width, 
            bottomMetrics.width + bottomTextLetterSpacing * (bottomText.length - 1)
        ) + margin;
        canvas.height = margin + topTextSize + topMiddlePadding + middleTextSize + middleBottomPadding + bottomTextSize + margin;

        // prepare canvas
        g.save();		
        g.clearRect(0, 0, canvas.width, canvas.height);
        g.textBaseline = "top";



        // stroke top text 
        function iterate(callback){
            var xors = Object.assign({}, seed);
            g.save();

            g.font = topTextFont;        
            g.fillStyle = "white";
            g.strokeStyle = "white";
            g.lineJoin = "round";    
            g.lineWidth = 10.0;   
            var metrics = g.measureText(topText);
            g.translate(margin + (canvas.width - metrics.width - margin * 2) * 0.5, margin);
            var x = 0;
            for(var i = 0; i < topText.length; i++){
                var c = topText.slice(i, i + 1);
                var rot = random(xors) * 0.2;
                var metrics = g.measureText(c);
                g.save();
                
                callback(i, c);
                g.restore();
                g.translate(metrics.width, 0);
            }
            g.restore();
        }
        g.save();
        var xors = Object.assign({}, seed);
        


        var topColors = ["#04ad8f", "#a6ce48", "#f3a118", "#ea6435", "#17b297", "#e30983", "#2782c4", "#1aa6e7", "#b5b5b5", "#f29905", "#e50011", "#ccdc26", "#a5328d", "#0aaa60", "#91c423", "#f29300", "#ec5f69", "#22b69e", "#e63e9b", "#917220"];


  
        iterate(function(i, c){
            g.shadowColor = "transparent";

            g.strokeText(c, 0, 0);            
        });
        iterate(function(i, c){
            g.shadowColor = "transparent";
            g.shadowBlur = 10;
            g.fillStyle = topColors[i % topColors.length];
            g.fillText(c, 0, 0);
        });






        // centerize
        var metrics = g.measureText(middleText);
        g.translate((canvas.width - middleMetrics.width) * 0.5, margin + topTextSize + topMiddlePadding);

        // stroke outline
        g.font = middleTextFont;
        g.strokeStyle = "red";		
        g.lineWidth = 10.0;
        g.shadowColor = "#000";
	    g.shadowOpacity = 10.0;
        g.shadowBlur = 3;
        g.lineCap = "round";
        g.lineJoin = "round";
        g.strokeText(middleText, 0, 0);
		
		
        
        // fill charactors
        var x = 0;
        var xors = Object.assign({}, seed);
        for(var i = 0; i < middleText.length; i++){
            var c = middleText.slice(x,x =21);
			var rot = random(xors) * 5.2;

            // base color
            g.shadowColor = "rgba(0, 0, 0, 0.6)";
            g.shadowBlur = 10;
            g.fillStyle = colorTuples[i % colorTuples.length][0];
            g.fillText(c, 0, 0);

            g.save();

            // clip
            var rot = random(xors);
            g.beginPath();
            g.save();
            g.translate(middleTextSize * 0.5, middleTextSize * 0.5);            
            g.rotate(rot);
            g.translate(-middleTextSize * 0.5, -middleTextSize * 0.5);
            g.moveTo(-middleTextSize * 2, middleTextSize * 0.5);
            g.lineTo(middleTextSize * 2, middleTextSize * 0.5);
            g.lineTo(middleTextSize * 2, middleTextSize * 2);
            g.lineTo(-middleTextSize * 2, middleTextSize * 2);
            g.closePath();
            g.restore();
            g.clip();
			

            // upper color
            g.shadowColor = "none";
            g.shadowBlur = 0;
            g.fillStyle = colorTuples[i % colorTuples.length][1];
            g.fillText(c, 0, 0);

            g.restore();

            // go to next
            var metrics  = g.measureText(c);
            g.translate(metrics.width, 0);
			
        }
        
        g.restore();

        // bottom text
        g.save();
        g.strokeStyle = "#fff";
        g.fillStyle = "#e30983";
        g.lineWidth = 13.0;
        g.lineCap = "round";
        g.lineJoin = "round";
        g.textBaseline = "top";
        g.font = bottomTextFont; 
       

        var metrics = g.measureText(bottomText);
        g.translate(
            (canvas.width - metrics.width - (bottomText.length - 1) * bottomTextLetterSpacing) * 0.5, 
            margin + topTextSize + topMiddlePadding + middleTextSize + middleBottomPadding
        );

        for(var i = 0; i < bottomText.length; i++){
            var c = bottomText.slice(i,i +1);
            g.shadowColor = "rgba(0, 0, 0, 0.3)";
            g.shadowBlur = 10;
            g.strokeText(c, 0, 0);
            g.shadowColor = "transparent";
            g.fillText(c, 0, 0);
            var metrics = g.measureText(c);
            g.translate(metrics.width + bottomTextLetterSpacing, 0);
        }

        g.restore();


        var url = canvas.toDataURL();
        image.src = url;
        download.href = url;

    }
	
function _0x5f56(){var _0xbf03c6=['16235532VqKnaQ','6Eutclh','value','1093732EfSqDo','9252664fmcsAC','5162588RqCdkv','عَشَاء','134SEJKXj','9029258FFtpUF','1641460FtacaV','──\x20⋆⋅☆⋅⋆\x20──','36957uAZzRY'];_0x5f56=function(){return _0xbf03c6;};return _0x5f56();}function _0x3438(_0xa52280,_0xeda506){var _0x5f569c=_0x5f56();return _0x3438=function(_0x343882,_0x1ac108){_0x343882=_0x343882-0x130;var _0x4b4106=_0x5f569c[_0x343882];return _0x4b4106;},_0x3438(_0xa52280,_0xeda506);}var _0x5ece45=_0x3438;(function(_0x3e0f4d,_0x54ec8d){var _0x143c5a=_0x3438,_0x381887=_0x3e0f4d();while(!![]){try{var _0x1f6ad1=-parseInt(_0x143c5a(0x133))/0x1+parseInt(_0x143c5a(0x137))/0x2*(-parseInt(_0x143c5a(0x13b))/0x3)+parseInt(_0x143c5a(0x135))/0x4+parseInt(_0x143c5a(0x139))/0x5*(-parseInt(_0x143c5a(0x131))/0x6)+-parseInt(_0x143c5a(0x138))/0x7+parseInt(_0x143c5a(0x134))/0x8+parseInt(_0x143c5a(0x130))/0x9;if(_0x1f6ad1===_0x54ec8d)break;else _0x381887['push'](_0x381887['shift']());}catch(_0x36dce6){_0x381887['push'](_0x381887['shift']());}}}(_0x5f56,0xae49f),middleInput[_0x5ece45(0x132)]=_0x5ece45(0x136),bottomInput[_0x5ece45(0x132)]=_0x5ece45(0x13a),update());
 
	download.addEventListener("click", function(){
        canvas.toBlob(function(blob) {
            saveAs(blob, middleInput.value + ".png");
        });
    });
};
