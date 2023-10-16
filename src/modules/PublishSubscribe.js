export const pubsub = {
    subscribes: [],
    subscribe: (action, fn) => {
        if(Array.isArray(subscribes[action])) {
            subscribes[action] = [ ...subscribes[action], fn]
        } else {
            subscribes[action] = [fn]
        }
    },
    unsubscribe: (action, fn) => {
        subscribes[action] = subscribes[action].filter(fun => fun !== fn);
    },
    publish: (action, data) => {
        subscribes[action].map(fn => fn(data));
    }
}