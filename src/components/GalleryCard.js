import { Component } from "../lib/Component";
import styles from './GalleryCard.css';
import thumbtack from "../assets/svg/thumbtack.svg"
import { DataObservable } from "../lib/DataObservable";
import { LocalStorage } from "../util/LocalStorage";

export class GalleryCard extends Component
{
    constructor()
    {
        super()
        this.styles = styles;
        this.data = DataObservable.getInstance();
    }

    static observedAttributes = ['pin'];

    get id()
    {
        return this.getAttribute('id')
    }

    get path()
    {
        return this.getAttribute('path')
    }

    get pin()
    {
        return this.getAttribute('pin')
    }

    effect()
    {
        this.handlerClick();
    }

    handlerClick()
    {
        const storage = new LocalStorage();
        const pins = [...this.shadowRoot.querySelectorAll('[to-pin]')];

        pins.map(pin => {
            pin.addEventListener('click', ({target}) => {
                const parent = target.closest('.gallery__card');
                
                // parent.classList.toggle('gallery__card--pin')
                storage.updatePin('gallery', parent.id);
            })
        })
    }

    view()
    {
        return `
            <div class="gallery__card ${this.pin ? "gallery__card--pin": ""}" id=${this.id}>
                <span class="g-card__icon" to-pin>${thumbtack}</span>
                <img src="${this.path}" alt="" draggable="false" />
            </div>
        `;
    }
}
customElements.define('component-gallery-card', GalleryCard, {extends: "div"})