export class Draggable
{
    constructor(root)
    {
        this.root = root;
    }

    handlerPreventDefault()
    {
        const events = ['dragover', 'drop']
        events.map(event => (
            this.root.addEventListener(event, e => e.preventDefault())
        ))
        return this;
    }

    handlerDrop(callback)
    {
        this.root.addEventListener('drop', callback)
    }
}