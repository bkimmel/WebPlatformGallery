var html = `
<svg style="width: 100%; height: 10em; background-color: black;" viewBox="0 0 50 10" preserveAspectRatio="xMidYMid meet">
  <g class="test" id="gmask" x="0"></g>
</svg>
<svg class="test2" style="width: 100%; height: 10em;" viewBox="0 0 50 10" preserveAspectRatio="xMidYMid meet">
    <defs>
        <mask id="smask" x="0" y="0" width="50" height="10" maskUnits="userSpaceOnUse">
            
            <use xlink:href="#gmask" />
        </mask>
    </defs>
    <text x="25" y="5" text-anchor="middle" dominant-baseline="middle" style="font-size: .75em;" mask="url(#smask)">Test</text>
</svg>
`;

var rects = [];
for(var i = 0, l = 10; i < l; i++){
    rects.push(`<rect x="0" y="0" width="1" height="15" class="rct" fill="#fff" transform="translate(${(12 + (Math.random()*15)).toPrecision(3)}, ${-10}) rotate(15) scale(0)" fill-opacity=".20"></rect>`);
}

document.body.innerHTML = html;
document.querySelector('.test').innerHTML = rects.join('');

window._easeOutSine = function (b, c, d, t) {
    //b: start position, c: delta/change to start, d: duration, t: current time
	return c * Math.sin(t/d * (Math.PI/2)) + b;
};

var animateset = Array.prototype.slice.call(document.querySelectorAll('.test rect')).map(function(v){ return [v, v.getAttribute('transform').split(/scale\(.\)/)[0]] });

function doMaskScale(){
    var dur = 3000;
    var start = 0, tgt = 35;
    var scalemask = window._easeOutSine.bind(this, start, tgt, dur);
    var _start = Date.now();
    requestAnimationFrame(function maskframe(){
        var progress = Date.now() - _start;
        var stopframe = true;
        if(progress <= dur){
            //debugger;
            var current_position = Number(scalemask(progress).toPrecision(4));
            stopframe = false;
        }
        else {
            var current_position = tgt;
             
        }
        //console.log(current_position);
        animateset.forEach(function(v){
           v[0].setAttribute('transform', v[1] + 'scale(' + current_position + ') translate(-.30, 0)'); 
        });
        !stopframe && requestAnimationFrame(maskframe); 
    })
}

/*
var rects = [];
for(var i = 0, l = 2000; i < l; i++){
    rects.push(`<rect x="0" y="0" width=".55" height=".55" fill="#fff" transform="translate(${(i * .5)%50}, ${(~~(i/100))*.5}) scale(1)" fill-opacity="0"></rect>`);
}

document.body.innerHTML = html;
document.querySelector('.test').innerHTML = rects.join('');
var srects = Array.prototype.slice.call( document.querySelectorAll('.test rect') );
var i = 0;
while(srects.length){
    var idx = ~~(srects.length * Math.random());
    console.log(idx);    
    (function(el, de){
                
        setTimeout(function(){ el[0].setAttribute('fill-opacity', 1); }, de);
    })(srects.splice(idx, 1), ++i*1.33);
}
*/
