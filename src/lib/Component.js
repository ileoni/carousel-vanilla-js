import { PubSubSingleton } from "./Pubsub";

export class Component extends HTMLDivElement
{
    constructor()
    {
        super();
        this.attachShadow({mode: "open"});
        this.pubsub = PubSubSingleton.getInstance();
        
        const _styles = this.styles();
        const _sheet = new CSSStyleSheet();
        _sheet.replaceSync(_styles);
        
        this.shadowRoot.adoptedStyleSheets = [_sheet];
    }

    // static observerAttributes = [];

    connectedCallback()
    {
        this.render();

    }

    // disconnectedCallback() {}

    attributeChangedCallback()
    {
    }

    // adoptedCallback() {}

    styles () {
        return ""
    }

    render() {}
}