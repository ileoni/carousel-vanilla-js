import { Component } from "../lib/Component";
import styles from "./Carousel.css"; 
import Cyberpunk from "../assets/img/cyberpunk.jpg";
import Slide from "../lib/Slide";
import { LocalStorage } from "../util/LocalStorage";

export class Carousel extends Component
{
    constructor()
    {
        super();
        this.styles = styles;
        this.toggle = false;
    }

    effect()
    {
        const slide = new Slide();
        slide.element = this.shadowRoot.querySelector('.carousel');
        slide.vertical = false;
        slide.activated()
    }

    elementFromHTML()
    {
        const storage = new LocalStorage();
        const records = storage.all('gallery');

        let html = "";
        for(let record of records) {
            if(record.pin) {
                html += `
                    <img src="${record.path}" alt="" draggable="false"/>
                `;
            }
        }

        return html;
    }
    
    view()
    {
        return `
            <div class="wrapper__carousel dash">
                <div class="carousel">
                    <div class="carousel__images">
                        ${this.elementFromHTML()}
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('component-carousel', Carousel, {extends: "div"});