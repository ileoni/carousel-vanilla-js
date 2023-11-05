import styles from './Carousel.css';
import { Component } from "../../lib/Component";
import Slide from "../../lib/Slide";

import { Card } from "./card";

export class Carousel extends Component
{
    constructor()
    {
        super();
    }

    render()
    {
        this.shadowRoot.innerHTML = `
            <div class="wrapper__carousel dash">
                <div class="carousel">
                    <div class="carousel__images">
                        <div is="component-carousel-card"></div>
                    </div>
                </div>
            </div>
        `;

        const scroll = this.shadowRoot.querySelector('.carousel');
        const slide = new Slide();
        slide.element = scroll;
        slide.vertical = false;
        slide.activated();
    }

    styles()
    {
        return styles.toString();
    }
}

customElements.define('component-carousel', Carousel, {extends: "div"});