import { Component } from "../lib/Component";
import Gallery from '../assets/svg/gallery.svg';

export class Button extends Component
{
    constructor()
    {
        super();
    }

    open()
    {
        this.pubsub.publish('galleryOpen', true);
    }

    render()
    {
        this.shadowRoot.innerHTML = `
            <button class="btn">
                <i>${Gallery}</i>
                <small>Gallery</small>
            </button>
        `;

        
        const btn = this.shadowRoot.querySelector('button');
        btn.addEventListener('click', this.open.bind(this));
    }

    styles()
    {
        return `
            button {
                cursor: pointer;
                margin: 0;
                padding: 0;
                border: none;
                outline: none;
                background: none;
            }
            .btn {
                height: 50px;
                display: grid;
                grid-template-columns: 4rem 5rem;
                place-items: center;
                background: var(--black);
                color: var(--white);
                border-radius: 16px;
            }
            .btn small {
                justify-self: start;
            }
            .btn svg {
                height: 30px;
            }
            .btn path {
                stroke: var(--white);
            }
        `;
    }
}

customElements.define('component-button', Button, {extends: "div"})