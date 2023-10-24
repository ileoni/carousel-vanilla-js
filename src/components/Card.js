import { Component } from "../lib/Component";
import thumbtack from "../assets/svg/thumbtack.svg"
import Cyberpunk from "../assets/img/cyberpunk.jpg";
import styles from "./Card.css";

export class Card extends Component
{
    constructor()
    {
        super();
        this.styles = styles;
    }

    static observedAttributes = ['pin'];

    get pin ()
    {
        return this.getAttribute('pin');
    }

    set pin (value)
    {
        this.setAttribute('pin', value);
    }

    view() {
        return `
            <div 
                class="gallery__card gallery__card--pin"
            >
                <span class="g-card__icon" pin>${thumbtack}</span>
                <img src="${Cyberpunk}" alt="" draggable="false"/>
            </div>
        `;
    }
}

customElements.define('component-card', Card, {"extends": "div"})