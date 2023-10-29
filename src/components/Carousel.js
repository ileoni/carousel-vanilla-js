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

        this.slide = new Slide();
        
        this.storage = new LocalStorage();
        this.data.subscribe(this.updateRender.bind(this));
    }

    effect()
    {   
        this.slide.element = this.shadowRoot.querySelector('.carousel');
        this.slide.vertical = false;
        this.slide.activated();
    }

    updateRender()
    {
        this.render();
    }

    elementFromHTML()
    {
        const records = this.storage.all('gallery');

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