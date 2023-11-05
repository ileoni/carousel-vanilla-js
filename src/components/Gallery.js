import { Component } from "../lib/Component";
import { LocalStorage } from "../util/LocalStorage";
import thumbtack from '../assets/svg/thumbtack.svg';

import { GalleryCard } from "./GalleryCard";
import Slide from "../lib/Slide";

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

        const gallery = this.shadowRoot.querySelector('[is=component-gallery-card]');
        
        const slide = new Slide ();
        slide.element = gallery;
        slide.activated();
    }

    styles()
    {
        return `
            .dash {
                border: var(--dash);
            }
            .wrapper__gallery {
                margin-left: 16px;
                padding: 16px 16px 0;
                position: absolute;
                inset: auto;
                bottom: 0;
                border: 1px #e9ecef solid;
                border-radius: 16px 16px 0 0;
                background: #f8f9fa;
            }
            h4 {
                margin: 0;
                font-family: 'Montserrat', sans-serif;
            }
            [is=component-gallery-card] {
                height: 0;
                margin: 8px 0;
                user-select: none;
                overflow-y: scroll;
                display: grid;
                grid-template-columns: repeat(2, calc(140px - 16px));
                grid-auto-rows: calc(140px / var(--max-span));
                gap: 16px;
                transition: 300ms all;
            }
            .w-gallery--show [is=component-gallery-card] {
                height: 300px;
                margin: 16px 0;
                transition: 300ms all;
            }
            [is=component-gallery-card]::-webkit-scrollbar {
                width: 2px;
            }
            @media (max-width: 600px) {
                .wrapper__gallery {
                    margin-left: 0;
                }
            }
        `;
    }
}

customElements.define('component-gallery', Gallery, {extends: "div"})