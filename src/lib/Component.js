import { DataObservable } from "./DataObservable";

export class Component extends HTMLDivElement
{
    constructor()
    {
        super();
        this.attachShadow({mode: "open"});
        this.styles = "";
        this.data = DataObservable.getInstance();
    }

    attributeChangedCallback()
    {
        console.log('Updated')
        this.render();
        this.effect();
    }

    connectedCallback()
    {
        console.log('Created')
        this.render();
        this.effect();
    }

    render() {
        const view = this.view();
        this.shadowRoot.innerHTML = view;
        
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(this.styles.toString());
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    effect() {}

    view() {}
}