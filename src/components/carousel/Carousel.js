import { Component } from "../../lib/Component";
import Slide from "../../lib/Slide";
import { LocalStorage } from "../../util/LocalStorage";
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

        const carousel = this.shadowRoot.querySelector('.carousel');
        
        const slide = new Slide();
        slide.element = carousel;
        slide.vertical = false;
        slide.activated();
    }

    styles()
    {
        return `
            .dash {
                border: var(--dash);
            }
            .wrapper__carousel {
                margin: 8px 0;
                padding: 16px 0;
                display: grid;
                background: var(--black);
                border-radius: 16px 0 0 16px;
            }
            .carousel {
                user-select: none;
                cursor: pointer;
                width: 90%;
                overflow-x: scroll;
                justify-self: end;
            }
            .carousel--grab {
                cursor: grabbing;
            }
            .carousel::-webkit-scrollbar
            {
                height: 1px;
            }
            // .carousel__images {
            //     display: grid;
            //     grid-auto-columns: calc(300px - 8px);
            //     grid-auto-rows: calc(300px - 8px);
            //     grid-auto-flow: column;
            //     gap: 16px;
            // }
            [is=component-carousel-card] {
                display: grid;
                grid-auto-columns: calc(300px - 8px);
                grid-auto-rows: calc(300px - 8px);
                grid-auto-flow: column;
                gap: 16px;
            }
            img {
                object-fit: cover;
                border-radius: 16px;
                height: 100%;
                width: 100%;
            }
        `;
    }
}

customElements.define('component-carousel', Carousel, {extends: "div"});