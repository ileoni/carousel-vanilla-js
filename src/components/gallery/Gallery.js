import styles from './Gallery.css';
import { Component } from "../../lib/Component";
import Slide from "../../lib/Slide";

import { Card } from "./Card";

export class Gallery extends Component
{
    constructor()
    {
        super();
        
        this.pubsub
            .subscribe('galleryOpen', this.galleryOpen.bind(this));
    }

    toggleClass({classList}, name)
    {
        const hasClass = classList.contains(name);
        classList.toggle(name, !hasClass);
    }

    galleryOpen()
    {
        const gallery = this.shadowRoot.querySelector('.gallery');
        this.toggleClass(gallery, 'w-gallery--show');
    }

    render()
    {
        this.shadowRoot.innerHTML = `
            <div class="wrapper__gallery">
                <div class="gallery">
                    <div class="gallery__header">
                        <h4>Gallery</h4>
                    </div>
                    <div is="component-gallery-card"></div>
                </div>
            </div>
        `;

        const scroll = this.shadowRoot.querySelector('[is=component-gallery-card]');
        const slide = new Slide ();
        slide.element = scroll;
        slide.activated();
    }

    styles()
    {
        return styles.toString();
    }
}

customElements.define('component-gallery', Gallery, {extends: "div"})