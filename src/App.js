import styles from "./App.css";
import { Component } from './lib/Component';
import { Button } from "./components/Button";
import { Carousel } from "./components/Carousel";
import { Gallery } from "./components/Gallery";

export class App extends Component
{
    constructor()
    {
        super();
        this.styles = styles;
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
                    <div is="component-gallery"></div>
                </section>
            </div>
        `;
    }
}

customElements.define('root-app', App, {extends: "div"})