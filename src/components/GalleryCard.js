import { Component } from "../lib/Component";
import thumbtack from "../assets/svg/thumbtack.svg"
import { LocalStorage } from "../util/LocalStorage";

export class GalleryCard extends Component
{
    constructor()
    {
        super();

        this.pubsub
            .subscribe('galleryAdded', this.galleryAdded.bind(this));
    }

    toggleClass({classList}, name)
    {
        const hasClass = classList.contains(name);
        classList.toggle(name, !hasClass);
    }

    galleryAdded()
    {
        this.render();
    }

    render()
    {
        const storage = new LocalStorage();
        const records = storage.all('gallery');

        this.shadowRoot.innerHTML = records.map(({id, mime, pin}) => (`
            <div 
                id=${id} 
                class="gallery__card ${pin ? "g-card--activated": ""}" 
                parent
            >
                <span class="g-card__icon" to-pin>${thumbtack}</span>
                <img src=${mime} alt="" draggable="false"/>
            </div>
        `)).join('');

        const pins = [...this.shadowRoot.querySelectorAll('[to-pin]')];
        pins.map(pin => {
            pin.addEventListener('click', ({target}) => {
                const parent = target.closest('[parent]');
                storage.updatePin('gallery', parent.id);
                this.toggleClass(parent,'g-card--activated');
                this.pubsub.publish('carouselUpdated', true);
            })
        })
    }

    styles()
    {
        return `
            .dash {
                border: var(--dash);
            }
            .gallery__card {
                position: relative;
                grid-row-end: span var(--min-span);
            }
            .gallery__card:nth-child(4n + 4) {
                grid-row-end: span var(--max-span);
            }
            .g-card__icon {
                height: 30px;
                width: 30px;
                cursor: pointer;
                position: absolute;
                inset: 8px auto;
                right: 8px;
                display: grid;
                place-items: center;
                border-radius: 50%;
                background: #CED4DA;
                color: var(--white);
            }
            .g-card--activated .g-card__icon {
                background: var(--bg-accent);
            }
            .g-card__icon svg {
                height: 24px;
            }
            .g-card__icon path {
                fill: #E9ECEF;
            }
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
                border-radius: 16px;
            }
        `;
    }
}
customElements.define('component-gallery-card', GalleryCard, {extends: "div"})