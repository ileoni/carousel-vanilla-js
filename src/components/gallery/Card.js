import styles from './Card.css';
import { Component } from "../../lib/Component";
import { LocalStorage } from "../../lib/LocalStorage";
import thumbtack from "../../assets/svg/thumbtack.svg"

export class Card extends Component
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
            <div id=${id} class="gallery__card ${pin ? "g-card--activated": ""}" parent>
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
        return styles.toString();
    }
}
customElements.define('component-gallery-card', Card, {extends: "div"})