import { Component } from "../lib/Component";
import styles from './Gallery.css';
import Cyberpunk from '../assets/img/cyberpunk.jpg';
import Slide from "../lib/Slide";

export class Gallery extends Component
{
    constructor()
    {
        super();
        this.styles = styles;
        this.open = false;
    }

    static observedAttributes = ['open'];

    get open()
    {
        return this.getAttribute('open');
    }

    set open(value)
    {
        this.setAttribute('open', value);
    }
    
    effect()
    {
        const gallery = this.shadowRoot.querySelector('.wrapper__gallery');
        
        if(this.open !== "false") {
            gallery.classList.add('wrapper__gallery--open');
        } else {
            gallery.classList.remove('wrapper__gallery--open');
        }

        const slide = new Slide();
        slide.element = this.shadowRoot.querySelector('.gallery__body');
        slide.activated()
    }


    view()
    {
        return `
            <div class="wrapper__gallery">
                <div class="gallery">
                    <div class="gallery__header">
                        <h4>Gallery</h4>
                    </div>
                    <div class="gallery__body">
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('component-gallery', Gallery, {extends: "div"})