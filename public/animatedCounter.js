'use strict'

function animatedCounter(id, start, end, speed) {
    var current = start;
    var increment;       
    var obj = document.getElementById(id);
    obj.innerText = current + ' kcal';
    var timer = setInterval(function() {
        increment = Math.floor(Math.pow(end-current, 0.80));
        var size = Math.floor(current/end);
        current += increment;
        obj.style.fontSize = (1-size)*120 + '%';
        obj.innerText = current + ' kcal';
        colorSelector(current, obj);
        if (current === end) {
          obj.style.fontSize = (1-size)*150 + '%';
          clearInterval(timer);
        }
    }, speed);
}

function colorSelector(current, obj) {
    
    var colors = [
        0   ,   "#006400",
        500 ,   "#008000",
        1000,   "#228B22",
        1500,   "#32CD32",
        2000,   "#7FFF00",
        2300,   "#FFFF00",
        2600,   "#FFA500",
        2900,   "#FF8C00",
        3200,   "#FF4500",
        3500,   "#FF0000"
    ];
    
    for(var i=0; i<colors.length; i += 2) {
        if (current >= colors[i]) {
            obj.style.color = colors[i+1];
        }
    }
}
