import styles from './Button.css';
import { Component } from "../../lib/Component";
import Gallery from '../../assets/svg/gallery.svg';

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
        return styles.toString();
    }
}

customElements.define('component-button', Button, {extends: "div"})