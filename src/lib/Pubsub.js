let instance;

class PubSub
{
    constructor()
    {
        if(instance) throw new Error("Você não pode criar uma nova instâcia");
        instance = this;
        this._observed = [];
    }

    getInstance()
    {
        return this;
    }
    
    subscribe(action, fn)
    {
        if(Array.isArray(this._observed[action])) {
            this._observed[action] = [...this._observed, fn];
        } else {
            this._observed[action] = [fn];
        }
    }
    
    unsubscribe(action, fn)
    {
        this._observed = this._observed[action].filter(fun => fun !== fn)
    }

    publish(action, data)
    {
        if(Array.isArray(this._observed[action])) {
            this._observed[action].map(fun => fun(data))
        }
        return false;
    }
}

export const PubSubSingleton = Object.freeze(new PubSub());