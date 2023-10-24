import styles from "./App.css";
import { Component } from './lib/Component';
import { Draggable } from "./lib/Draggable";
import { Button } from "./components/Button";
import { Carousel } from "./components/Carousel";
import { Gallery } from "./components/Gallery";
import { LocalStorage } from "./util/LocalStorage";

export class App extends Component
{
    constructor()
    {
        super();
        this.styles = styles;
        this.storage = new LocalStorage();
        this.drag = new Draggable(this.shadowRoot);
    }
    
    async handlerPromise(files)
    {
        let records = [];
        for(let file of files) {
            records.push(
                await new Promise(resolver => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolver({
                            id: this.storage.hash(4),
                            path: reader.result,
                            pin: false,
                        });
                    }
                    reader.readAsDataURL(file);
                })
            );
        }
        return records;
    }
    
    effect()
    {
        this.drag
            .handlerPreventDefault()
            .handlerDrop( async ({dataTransfer}) => {
                const { files } = dataTransfer;
                const records = await this.handlerPromise(files);
                if(this.storage.size('gallery', records)) {
                    this.storage.save('gallery', records);
                }
            });
    }

    view()
    {
        return `
            <div class="wrapper">
                <div class="overlay"></div>
                <header class="wrapper__header">
                    <h1>Preview Carousel</h1>
                    <small>drag and drop images to gallery anywhere</small>
                </header>
                <section class="wrapper__body">
                    <div is="component-button"></div>
                    <div is="component-carousel"></div>
                    <div is="component-gallery" count="${this.count}"></div>
                </section>
            </div>
        `;
    }
}

customElements.define('root-app', App, {extends: "div"})