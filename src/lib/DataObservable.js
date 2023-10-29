let instance;

class Data
{
    constructor()
    {
        if(instance) throw new Error("Você não pode criar uma nova instâcia");
        instance = this;
        this.observer = [];
        this.state = {};
    }

    getInstance()
    {
        return this;
    }

    subscribe(fn)
    {
        this.observer.push(fn);
    }

    unsubscribe(fn)
    {
        this.observer = [...this.observer.filter(fun => fun != fn)];
    }

    notify(data)
    {
        this.observer.map(fn => fn(data));
    }
}

export const DataObservable = Object.freeze(new Data());