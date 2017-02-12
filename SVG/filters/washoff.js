var html = `
<svg class="test" style="width: 100%; height: 10em;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
 <text x="30" y="70" font-size="50">TEST</text>
</svg>
<svg class="test b" style="width: 100%; height: 10em;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
 <defs>
    <filter id="blurFilter4" x="-20" y="-20" width="200" height="200">
        <feMorphology in="SourceGraphic" operator="dilate" radius="8" result="spread"/>
        <feGaussianBlur in="spread" stdDeviation="7" result="gauss"/>
        <feComponentTransfer in="gauss" result="ct">
            <feFuncA type="linear" slope="1.25" intercept="0"></feFuncA>
        </feComponentTransfer>
        <feTurbulence result="turb" type="fractalNoise" baseFrequency="0.01425" numOctaves="2"/>
        <feComponentTransfer id="a_turb" in="turb" result="a_turb">
            <feFuncA id="blur_tgt" type="linear" slope="4" intercept="0"></feFuncA>
        </feComponentTransfer>
        <feComposite operator="in" in="ct" in2="a_turb" result="blur"/>
        <feMerge>
          <feMergeNode in="blur" />
            
          <feMergeNode in="SourceGraphic" />

        </feMerge>
    </filter>
 </defs>
 <text x="30" y="70" font-size="50" style="filter: url(#blurFilter4);">TEST</text>
</svg>
`;

window._easeOutSine = function (b, c, d, t) {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
};


window.animateBlur = function amimateBlur(){
    var starttime = Date.now();
    var sineBlur = _easeOutSine.bind(this, 4, -4, 2000);
    var tgt = document.getElementById('blur_tgt');
    requestAnimationFrame(function doanim(){
        var t = Date.now() - starttime;
        if(t >= 2000){
            return tgt.setAttribute('slope','0');
        }
        else {
            tgt.setAttribute('slope',sineBlur(t));
            requestAnimationFrame(doanim);
        }
    });

}

document.body.innerHTML = html;
document.querySelector('.b').addEventListener('click', animateBlur);
