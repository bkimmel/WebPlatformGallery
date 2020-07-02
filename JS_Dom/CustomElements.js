function doCustoms(){
    class ColorInDiv extends HTMLElement {
        constructor(){
            //Always done in customs:
            super();
            const shadow = this.attachShadow({mode: 'open'});

            const wrapper = document.createElement('form');
            wrapper.setAttribute('class','colordiv');
            const bgcolor = 'red';
            wrapper.innerHTML = `
                <style>
                    .colordiv {
                        width: 30em;
                        height: 3em;
                        color: white;
                        background: ${bgcolor};
                    }
                </style>
                <label>
                    <span>Change the color:</span>
                    <input id="change-color" type="text" />
                </label>
            `;

            wrapper.querySelector('#change-color').addEventListener('change', (e)=>{
                wrapper.style.backgroundColor = e.target.value;
            });

            shadow.appendChild(wrapper);

        }
    }
    customElements.define('color-in-div', ColorInDiv);
    document.body.innerHTML = `
        <color-in-div />
    `;
}
