import { Component } from "../lib/Component";
import { LocalStorage } from "../util/LocalStorage";
import styles from './Gallery.css';
import thumbtack from '../assets/svg/thumbtack.svg'
import Slide from "../lib/Slide";

export class Gallery extends Component
{
    constructor()
    {
        super();
        this.styles = styles;

        this.slide = new Slide();

        this.storage = new LocalStorage();
        this.data.subscribe(this.show.bind(this))
    }

    effect()
    {
        this.slide.element = this.shadowRoot.querySelector('.gallery__body');
        this.slide.activated();

        const pins =[...this.shadowRoot.querySelectorAll('[to-pin]')];
        pins.map(pin => {
            pin.addEventListener('click', ({target}) => {
                const parent = target.closest('.gallery__card');
                const toggle = parent.classList.contains('g-card--activated');
                parent.classList.toggle('g-card--activated', !toggle);
                this.storage.updatePin('gallery', parent.id);
                this.data.notify(true);
            })
        })   
    }

    show(value)
    {
        const gallery = this.shadowRoot.querySelector('.wrapper__gallery');
        gallery.classList.toggle('w-gallery--show', value)
    }

    elemenstFromHtml()
    {
        const records = this.storage.all('gallery');

        const template = ({id, path, pin}) => {
            return `
                <div class="gallery__card ${pin ? "g-card--activated": ""}" id=${id}>
                    <span class="g-card__icon" to-pin>${thumbtack}</span>
                    <img src=${path} alt="" draggable="false"/>
                </div>
            `;
        }
    
        return records.map(template).join('');
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
                        ${this.elemenstFromHtml()}
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('component-gallery', Gallery, {extends: "div"})