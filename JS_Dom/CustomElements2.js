function doCustoms(){
    class ColorInDiv extends HTMLElement {
        #listeners = new Set();
        #templates = new Map();
        constructor(){
            console.info('constructor: color-in-div');
            //Always done in customs:
            super();
            const shadow = this.attachShadow({mode: 'open'});
            
            //Set style defaults:
            const bgcolor = 'red';
            const componentStyleRules = `
                .colordiv {
                    width: 30em;
                    min-height: 3em;
                    color: white;
                    background: ${bgcolor};
                }
                .colordiv ul li {
                    color: white;
                }
            `
            
            //Register templates:
            const itemTemplate = document.createElement('template');
            itemTemplate.innerHTML = `
                <li></li>
            `;
            this.#templates.set('listItem',itemTemplate);

            //Construct content:
            
            const wrapper = document.createElement('form');
            wrapper.setAttribute('class','colordiv');
            wrapper.innerHTML = `
                <style>
                    ${componentStyleRules}
                </style>
                <label>
                    <span>Change the color:</span>
                    <input id="change-color" type="text" />
                </label>
                <button type="button">Add line</button>
                <ul>
                </ul>
            `;

            //Prescribe event listeners:
            this.#listeners.add( [wrapper.querySelector('#change-color'), 'change', (e)=>{
                wrapper.style.backgroundColor = e.target.value;
            }]);

            this.#listeners.add( [wrapper.querySelector('button'), 'click', (e)=>{
                console.info('click: color-in-div');
                e.preventDefault();
                e.stopPropagation();
                var clone = document.importNode(this.#templates.get('listItem').content, true);
                var [li] = clone.children;
                li.style.fontSize = this.getAttribute('item-font-size')+'px';
                li.innerText = wrapper.querySelector('#change-color').value;
                wrapper.querySelector('ul').appendChild(clone);
            }]);

            //Append the component host element to the shadow root:
            shadow.appendChild(wrapper);
        }

        connectedCallback() {
            console.info('connected: color-in-div');
            //Initialize attributes
            if (!this.hasAttribute('item-font-size')) {
               this.setAttribute('item-font-size', 16);
            }

            //Attach listeners
            for(const [host, event, listener] of this.#listeners) {
                host.addEventListener(event, listener);
            }    
        }

        disconnectedCallback() {
            console.info('disconnected: color-in-div');
            //Detach listeners
            for(const [host, event, listener] of this.#listeners) {
                host.removeEventListener(event, listener);
            }  
        }

        static get observedAttributes() {
            console.info('get observedAttributes(): color-in-div');
            //List attributes to be observed
            return ['item-font-size'];
        }

        //Reflect all communion values on attributes
        get "item-font-size"() {
            console.info('get item-font-size(): color-in-div');
            return this.getAttribute('item-font-size');
        }

        set "item-font-size"(value) {
            console.info('set item-font-size(): color-in-div');
            this.setAttribute('item-font-size', value);
        }

        //Reflect communion attribute changes on values
        attributeChangedCallback(name, oldValue, newValue) {
            console.info('attribute changed: color-in-div -> ', [name, oldValue, newValue]);
            //Note: since the _get_ poperty serves from the attribute already, we only need to do "additional" cleanup/reconciliation here
            //like setting aria-attributes, etc.
        }

    }
    customElements.define('color-in-div', ColorInDiv);
    document.body.innerHTML = `
        <color-in-div />
    `;
}
