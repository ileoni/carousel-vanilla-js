import { Component } from './lib/Component';
import { Draggable } from "./lib/Draggable";
import { LocalStorage } from "./util/LocalStorage";

import { Button } from "./components/Button";
import { Carousel } from "./components/carousel/Carousel";
import { Gallery } from "./components/Gallery";

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
        return `
            .dash {
                border: 1px dashed;
            }
            h1 {
                margin: 0;
                font-family: "Montserrat", sans-serif;
                font-weight: 600;
            }
            small {
                font-family: "Roboto", sans-serif;
                font-weight: 400;
            }
            .wrapper {
                margin-left: 16px;
                height: 100vh;
                display: grid;
                grid-template-rows: auto 1fr;
            }
            .wrapper__header {
                padding: 16px 0;
                width: 80%;
                justify-self: center;
            }
            .wrapper__body {
                padding: 8px 0;
                width: 90%;
                position: relative;
                justify-self: end;
            }
            .dropzone {
                position: absolute;
                inset: 0;
                background: red;
                z-index: -1;
            }
            .overlay {
                position: absolute;
                inset: 0;
                clip-path: polygon(100% 17%, 100% 100%, 11% 100%, 8% 89%);
                background: var(--bg-accent);
            }
            @media (max-width: 600px) {
                .wrapper__header,
                .wrapper__body {
                    width: 100%;
                }   
            }
        `;
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