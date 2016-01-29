'use strict'

function animatedCounter(id, start, end, speed) {
    var current = start; 
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        var increment = Math.floor(Math.pow(end-current, 0.85));
        current += increment;
        var size = Math.floor(100*((current-start)/(end-start)));
        obj.style.fontSize = (size)*1.2 + '%';
        obj.innerText = current + ' kcal';
        colorSelector(current, obj);
        if (current === end) {
          obj.style.fontSize = (size)*1.5 + '%';
          clearInterval(timer);
        }
    }, speed);
}










function colorSelector(current, obj) {

    var colors = [
        0  ,    "#00FF00",
        100,    "#11FF00",
        200,    "#22FF00",
        300,    "#33FF00",
        400,    "#44FF00",
        500,    "#55FF00",
        600,    "#66FF00",
        700,    "#77FF00",
        800,    "#88FF00",
        900,    "#99FF00",
        1000,   "#AAFF00",
        1100,   "#BBFF00",
        1200,   "#CCFF00",
        1300,   "#DDFF00",
        1400,   "#EEFF00",
        1500,   "#FFFF00",
        1600,   "#FFEE00",
        1700,   "#FFDD00",
        1800,   "#FFCC00",
        2000,   "#FFBB00",
        2100,   "#FFAA00",
        2200,   "#FF9900",
        2300,   "#FF8800",
        2400,   "#FF7700",
        2500,   "#FF6600",
        2600,   "#FF5500",
        2700,   "#FF4400",
        2800,   "#FF3300",
        2900,   "#FF2200",
        3000,   "#FF1100",
        3100,   "#FF0000"
    ];
    
    for(var i=0; i<colors.length; i += 2) {
        if (current >= colors[i]) {
            obj.style.color = colors[i+1];
        }
    }
}
