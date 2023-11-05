import styles from './App.css';
import { Component } from './lib/Component';
import { Draggable } from "./lib/Draggable";
import { LocalStorage } from "./lib/LocalStorage";

import { Button } from "./components/button/Button";
import { Carousel } from "./components/carousel/Carousel";
import { Gallery } from "./components/gallery/Gallery";

export class App extends Component
{
    constructor()
    {
        super();

        this.storage = new LocalStorage();

        const draggable = new Draggable(this.shadowRoot);
        draggable
            .handlerPreventDefault()
            .handlerDrop(this.drop.bind(this));
    }

    async handlerPromise(records)
    {
        let data = [];
        for(let record of records) {
            const result = await new Promise(resolve => {
                const read = new FileReader();
                read.onload = () => resolve({
                    id: this.storage.hash(5),
                    mime: read.result,
                    pin: false
                });
                read.readAsDataURL(record);
            })
            data.push(result);
        }
        return data;
    }

    async drop({dataTransfer})
    {
        this.storage
            .save('gallery', await this.handlerPromise(dataTransfer.files));
        this.pubsub.publish('galleryAdded', true);
    }
    
    render()
    {
        this.shadowRoot.innerHTML = `
            <div class="wrapper">
                <div class="overlay"></div>
                <header class="wrapper__header">
                    <h1>Preview Carousel</h1>
                    <small>drag and drop images to gallery anywhere</small>
                </header>
                <section class="wrapper__body">
                    <div is="component-button"></div>
                    <div is="component-carousel"></div>
                    <div is="component-gallery"></div>
                </section>
            </div>
        `;
    }
    
    styles()
    {
        return styles.toString();
    }
}



{/* <div class="wrapper">
<div class="overlay"></div>
<header class="wrapper__header">
    <h1>Preview Carousel</h1>
    <small>drag and drop images to gallery anywhere</small>
</header>
<section class="wrapper__body">
    <div is="component-button"></div>
    <div is="component-carousel"></div>
    <div is="component-gallery"></div>
</section>
</div> */}

customElements.define('root-app', App, {extends: "div"})