import { Component } from "../../lib/Component";
import { LocalStorage } from "../../util/LocalStorage";

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
        return `
            img {
                object-fit: cover;
                border-radius: 16px;
                height: 100%;
                width: 100%;
            }
        `;
    }
}

customElements.define('component-carousel-card', Card, {extends: "div"});