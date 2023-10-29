import styles from './Button.css';
import { Component } from "../lib/Component";
import Gallery from '../assets/svg/gallery.svg';

export class Button extends Component
{
    constructor()
    {
        super();
        this.styles = styles;
        this.toggle = false;
    }

    effect()
    {
        const toOpen = () => {
            this.toggle = !this.toggle;
            this.data.notify(this.toggle);
        };

        const btn = this.shadowRoot.querySelector('button');
        btn.addEventListener('click', toOpen);
    }

    view()
    {
        return `
            <button class="btn">
                <i>${Gallery}</i>
                <small>Gallery</small>
            </button>
        `;
    }
}

customElements.define('component-button', Button, {extends: "div"})