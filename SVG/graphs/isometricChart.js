const RunExample = (()=>{
    function rads(degs=0) {
        return degs * (Math.PI / 180);
    }

    function rotationByParameterAboutZ(rot) {
        return new DOMMatrixReadOnly([Math.cos(rot), Math.sin(rot), 0, 0, -Math.sin(rot), Math.cos(rot), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, ]);
    }

    function rotationByParameterAboutX(rot) {
        return new DOMMatrixReadOnly([1, 0, 0, 0, 0, Math.cos(rot), -Math.sin(rot), 0, 0, Math.cos(rot), Math.sin(rot), 0, 0, 0, 0, 1]);
    }

    function center() {
        return new DOMMatrixReadOnly([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
    }

    document.body.innerHTML = `
    <style>
        svg {
            display: block;
            width: 80vw;
            height: 80vw;
            box-sizing: border-box;
            border: 2px dotted red;
            margin: 0 auto;
        }
        .cons {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-around;
            margin: 1em;
        }
        .cons button {
            padding: 1em;
            background: #aaa;
            border: 1px solid black;
            margin: 1em;
        }
    </style>
    <svg id="outer" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="extrude">
                <feConvolveMatrix in="SourceAlpha" kernelMatrix="0 0 0 0 0 0 1 1 0"
                                  divisor="1" targetX="1" targetY="1" result="BEVEL" />
                <!-- OFFSET -->
                <feOffset in="BEVEL" dx="0" dy="1" result="OFFSET" />
                <feFlood flood-color="#777" result="BASECOLOR" />
                <feComposite operator="in" result="EXTRUSION" in="BASECOLOR" in2="OFFSET" />
                <feMerge result="EXTRUDED">
                    <feMergeNode in="EXTRUSION" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
          </filter>
        </defs>
        <g id="scene_rotate_z">
            <g id="xAxis">
              <line x1="-300" y1="0" x2="530" y2="0" stroke="#44444477" stroke-width="3"></line>
              <circle cx="-300" cy="0" r="5" fill="#444444" />
              <text class="meta" x="-300" y="-20" text-anchor="middle">(x: -300, y: 0)</text>
              <circle cx="530" cy="0" r="5" fill="#444444" />
              <text class="meta" x="530" y="20" text-anchor="middle">(x: 530, y: 0)</text>
              <circle cx="0" cy="0" r="5" fill="#994444" />
            </g>
            <g id="yAxis">
              <line x1="0" y1="-300" x2="0" y2="530" stroke="#44444477" stroke-width="3"></line>
              <circle cx="0" cy="-300" r="5" fill="#444444" />
              <text class="meta" x="0" y="-320" text-anchor="middle">(x: 0, y: -300)</text>
              <circle cx="0" cy="530" r="5" fill="#444444" />
              <text class="meta" x="0" y="550" text-anchor="middle">(x: 0, y: 530)</text>
            </g>
            <text filter="url(#extrude)" id="layflat" x="20" y="-20" text-anchor="start" font-size="40">Line Text Label</text>
        </g>
</svg>
    <section class="cons">
        <button id="panLeft">Left</button>
        <button id="panRight">Right</button>
       
    </section>
    `;

    const sceneBaseMatrix = rotationByParameterAboutZ(rads(30));
    const textMatrix = rotationByParameterAboutX(rads(45));
    const sceneFinalMatrix = sceneBaseMatrix//.multiply(textMatrix);
    
    document.getElementById('scene_rotate_z').style.transform = `${sceneFinalMatrix}`;
    //document.getElementById('layflat').style.transform = `${textMatrix}`;

    [...document.getElementsByClassName('meta')].forEach((el)=>{
        //console.log(el);
        const x = el.getAttribute('x');
        const y = el.getAttribute('y');
        el.setAttribute('transform', `translate(${x}, ${y}) rotate(-30) translate(${-x}, ${-y})`)
    });
    
    document.getElementById('panLeft').addEventListener('click', ()=>{
            const currentViewBox = document.getElementById('outer').getAttribute('viewBox').split(' ');
            const [currentX, ...rest] = currentViewBox;
            const currentInt = parseInt(currentX, 10);
            document.getElementById('outer').setAttribute('viewBox', [currentInt - 50, ...rest].join(' '));
    });

    document.getElementById('panRight').addEventListener('click', ()=>{
            const currentViewBox = document.getElementById('outer').getAttribute('viewBox').split(' ');
            const [currentX, ...rest] = currentViewBox;
            const currentInt = parseInt(currentX, 10);
            document.getElementById('outer').setAttribute('viewBox', [currentInt + 50, ...rest].join(' '));
    });

}
);

RunExample();
