import button from './Button.css';
import { Component } from "../lib/Component";
import Gallery from '../assets/svg/gallery.svg';

export class Button extends Component
{
    constructor()
    {
        super();
        this.styles = button;
    }

    effect()
    {
        this.handlerClick();
    }

    handlerClick()
    {
        let toggle = false;
        const btn = this.shadowRoot.querySelector('.btn');
        btn.addEventListener('click', () => {
            toggle = !toggle;
            const root = this.closest('.wrapper__body');
            const gallery = root.querySelector('[is=component-gallery]');
            gallery.setAttribute('open', toggle);
            // gallery.classList.add('wrapper__gallery--open');
            // console.log(toggle)
        })
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