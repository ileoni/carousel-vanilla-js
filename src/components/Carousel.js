import { Component } from "../lib/Component";
import styles from "./Carousel.css"; 
import Cyberpunk from "../assets/img/cyberpunk.jpg";
import Slide from "../lib/Slide";

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
    
    view()
    {
        return `
            <div class="wrapper__carousel dash">
                <div class="carousel">
                    <div class="carousel__images">
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                        <img src="${Cyberpunk}" alt="" draggable="false"/>
                    </div>
                </div>
            </div>
        `;
    }
}


{/* <img src="${Cyberpunk}" alt="" />
<img src="${Cyberpunk}" alt="" />
<img src="${Cyberpunk}" alt="" />
<img src="${Cyberpunk}" alt="" />
<img src="${Cyberpunk}" alt="" />
<img src="${Cyberpunk}" alt="" />
<img src="${Cyberpunk}" alt="" />
<img src="${Cyberpunk}" alt="" />
<img src="${Cyberpunk}" alt="" /> */}

customElements.define('component-carousel', Carousel, {extends: "div"});