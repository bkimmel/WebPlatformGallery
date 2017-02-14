var html = `
<svg class="test" style="width: 100%; height: 10em;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
 <text x="30" y="70" font-size="50">TEST</text>
</svg>
<svg class="test b" style="width: 100%; height: 10em;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
 <defs>
    <filter id="blurFilter4" x="-20" y="-20" width="140" height="140">
        <feMorphology in="SourceGraphic" operator="dilate" radius="8" result="spread"/>
        <feGaussianBlur in="spread" stdDeviation="9" result="gauss"/>
        <feComponentTransfer in="gauss" result="ct">
            <feFuncA type="linear" slope="1.4" intercept="-0.2"></feFuncA>
        </feComponentTransfer>
        <feTurbulence result="turb" type="fractalNoise" baseFrequency="0.01425" numOctaves="2" seed="42"/>
        <feComponentTransfer id="a_turb" in="turb" result="a_turb">
            <feFuncA id="blur_tgt" type="linear" slope="1.75" intercept="0"></feFuncA>
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
<svg class="test c" style="width: 100%; height: 10em;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
    <defs>
        <filter id="testFilter5" x="-20" y="-20" width="140" height="140">
            <feComponentTransfer in="SourceGraphic" result="tf5_fade">
                <feFuncA type="linear" slope=".5" intercept="0"></feFuncA>
            </feComponentTransfer>
            <feOffset class="offset pynx" in="tf5_fade" dx="-21.213" dy="21.213" result="tf5_pynx" />
            <feOffset class="offset pypx" in="tf5_fade" dx="21.213" dy="21.213" result="tf5_pypx" />
            <feOffset class="offset nypx" in="tf5_fade" dx="21.213" dy="-21.213" result="tf5_nypx" />
            <feOffset class="offset nynx" in="tf5_fade" dx="-21.213" dy="-21.213" result="tf5_nynx" />
            <feMerge>
              <feMergeNode in="tf5_pynx" />
              <feMergeNode in="tf5_pypx" />
              <feMergeNode in="tf5_nynx" />
              <feMergeNode in="tf5_nypx" />
            </feMerge>
        </filter>
    </defs>
    <text x="30" y="70" font-size="50" style="filter: url(#testFilter5);">TEST</text>
</svg>
<svg class="test d" style="width: 100%; height: 10em;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
  <filter id="displacementFilter" x="-20" y="-20" width="140" height="140">
    <feTurbulence type="turbulence" baseFrequency="0.051751" seed="4"
        numOctaves="3" result="disp_turb"/>
    
    <feDisplacementMap id="tgt_disp" in2="disp_turb" in="SourceGraphic"
        scale="30" xChannelSelector="A" yChannelSelector="A"/>
  </filter>
  <text x="30" y="70" font-size="50"
      style="filter: url(#displacementFilter)">TEST</text>
</svg>
`;

window._getY = function getY(rads, h){
   return (Math.sin(rads) * h).toPrecision(5); 
};

window._getX = function getX(rads, h){
   return (Math.cos(rads) * h).toPrecision(5);
};

window._easeOutSine = function (b, c, d, t) {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
};

window.joinLock = {};
window.animateJoin = function animateJoin(){
    var duration = 5000;
    var hyp = 30;
    var ang_rads = Math.PI/4;
    var starttime = Date.now();
    var sineLen = _easeOutSine.bind(this, hyp, -1 * hyp, duration);
    var offs = {
        nynx: document.querySelector('.nynx'),
        nypx: document.querySelector('.nypx'),
        pynx: document.querySelector('.pynx'),
        pypx: document.querySelector('.pypx')
    };
    var lockUp = {};
    window.joinLock = lockUp;
    if(!('requestAnimationFrame' in window)){
         return Array.prototype.slice.call(document.querySelectorAll('.offset')).forEach(function(v){ v.setAttribute('dx','0'); v.setAttribute('dy','0'); })
    }
    requestAnimationFrame(function doanim(){
        if(!window.blurLock === lockUp){
            return false;
        }
        var t = Date.now() - starttime;
        if(t >= duration){
            return Array.prototype.slice.call(document.querySelectorAll('.offset')).forEach(function(v){ v.setAttribute('dx','0'); v.setAttribute('dy','0'); });
        }
        else {
            var currtlen = sineLen(t);
            var currtx = window._getX(ang_rads, currtlen), currty = window._getY(ang_rads, currtlen);
            offs.nynx.setAttribute('dx', -1 * currtx);
            offs.nynx.setAttribute('dy', -1 * currty);
            offs.nypx.setAttribute('dx', currtx);
            offs.nypx.setAttribute('dy', -1 * currty);
            offs.pynx.setAttribute('dx', -1 * currtx);
            offs.pynx.setAttribute('dy', currty);
            offs.pypx.setAttribute('dx', currtx);
            offs.pypx.setAttribute('dy', currty);
            requestAnimationFrame(doanim);
        }
    });
}

window.blurLock = {};
window.animateBlur = function amimateBlur(){
    var duration = 800;
    var starttime = Date.now();
    var sineBlur = _easeOutSine.bind(this, 1.4, -1.4, duration);
    var tgt = document.getElementById('blur_tgt');
    var lockUp = {};
    window.blurLock = lockUp;
    if(!('requestAnimationFrame' in window)){
         return tgt.setAttribute('slope','0');
    }
    requestAnimationFrame(function doanim(){
        if(!window.blurLock === lockUp){
            return false;
        }
        var t = Date.now() - starttime;
        if(t >= duration){
            return tgt.setAttribute('slope','0');
        }
        else {
            tgt.setAttribute('slope',sineBlur(t));
            requestAnimationFrame(doanim);
        }
    });

}

window.animateDisp = function amimateDisp(){
    var duration = 5000;
    var starttime = Date.now();
    var sineDisp = _easeOutSine.bind(this, 30, -30, duration);
    var tgt = document.getElementById('tgt_disp');
   
    if(!('requestAnimationFrame' in window)){
         return tgt.setAttribute('scale','0');
    }

    requestAnimationFrame(function doanim(){
        var t = Date.now() - starttime;
        if(t >= duration){
            return tgt.setAttribute('scale','0');
        }
        else {
            tgt.setAttribute('scale',sineDisp(t));
            requestAnimationFrame(doanim);
        }
    });

}

document.body.innerHTML = html;
document.querySelector('.b').addEventListener('click', animateBlur);
document.querySelector('.c').addEventListener('click', animateJoin);
document.querySelector('.d').addEventListener('click', animateDisp);
