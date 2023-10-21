export class Component extends HTMLDivElement
{
    constructor()
    {
        super();
        this.attachShadow({mode: "open"});
        this.styles = "";
    }

    attributeChangedCallback()
    {
        this.render();
        this.effect();
    }

    connectedCallback()
    {
        this.render();
        this.effect();
    }

    render() {
        const view = this.view();
        this.shadowRoot.innerHTML = view;
        
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(this.styles.toString());
        this.shadowRoot.adoptedStyleSheets = [sheet];
        
        // const style = document.createElement('style');
        // style.textContent = this.styles.toString();
        // this.shadowRoot.appendChild(style);
    }

    effect() {}

    view() {}
}