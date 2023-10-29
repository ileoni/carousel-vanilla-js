import { Component } from "../lib/Component";
import styles from './Gallery.css';
import Slide from "../lib/Slide";
import Cyberpunk from "../assets/img/cyberpunk.jpg";
import thumbtack from "../assets/svg/thumbtack.svg"
import { LocalStorage } from "../util/LocalStorage";

export class Gallery extends Component
{
    constructor()
    {
        super();
        this.styles = styles;
        this.open = false;
    }

    static observedAttributes = ['open', "teste"];

    get open()
    {
        return this.getAttribute('open');
    }

    set open(value)
    {
        this.setAttribute('open', value);
    }

    get teste()
    {
        return this.getAttribute('teste');
    }

    set teste(value)
    {
        this.setAttribute('teste', value);
    }

    toPin()
    {
        const storage = new LocalStorage();
        const pins = this.shadowRoot.querySelectorAll('[to-pin]');

        for(let pin of pins) {
            pin.addEventListener('click', ({target}) => {
                const {id} = target.closest('.gallery__card');
                storage.updatePin('gallery', id);
            })    
        }
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
        
        this.toPin()
    }

    elementFromHTML()
    {
        const storage = new LocalStorage();
        const records = storage.all('gallery');
        
        let html = "";
        for(let record of records) {
            const pin = record.pin ? "gallery__card--pin": "";
            html += `
                <div id="${record.id}" class="gallery__card ${pin}">
                    <span class="g-card__icon" to-pin>${thumbtack}</span>
                    <img src="${record.path}" alt="" draggable="false"/>
                </div>
            `;
        }

        return html;
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
                        ${this.elementFromHTML()}
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('component-gallery', Gallery, {extends: "div"})