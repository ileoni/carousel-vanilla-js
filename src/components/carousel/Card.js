import styles from './Card.css';
import { Component } from "../../lib/Component";
import { LocalStorage } from "../../lib/LocalStorage";

export class Card extends Component
{
    constructor()
    {
        super();

        this.pubsub
            .subscribe('carouselUpdated', this.carouselUpdated.bind(this));
    }

    carouselUpdated()
    {
        this.render();
    }

    render()
    {
        const storage = new LocalStorage();
        const records = storage.isFixed('gallery');

        const template = records.map(({mime}) => (`
            <img src="${mime}" alt="" draggable="false"/>
        `)).join('');

        this.shadowRoot.innerHTML = template;
    }

    styles()
    {
        return styles.toString();
    }
}

customElements.define('component-carousel-card', Card, {extends: "div"});