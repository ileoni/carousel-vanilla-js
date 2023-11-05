let instance;

class Data
{
    constructor()
    {
        if(instance) throw new Error("Você não pode criar uma nova instâcia");
        instance = this;
        this._observer = [];
    }

    getInstance()
    {
        return this;
    }

    subscribe(fn)
    {
        this._observer.push(fn);
    }

    unsubscribe(fn)
    {
        this._observer = [...this._observer.filter(fun => fun != fn)];
    }

    notify(data)
    {
        this._observer.map(fn => fn(data));
    }
}

export const DataObservable = Object.freeze(new Data());