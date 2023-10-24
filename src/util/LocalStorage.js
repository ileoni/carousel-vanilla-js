export class LocalStorage
{
    constructor()
    {
        this.storage = localStorage;
    }

    hash(range)
    {
        const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        let hash = "";
        let count = 0;
        while(count < range) {
            hash += letter.at(Math.floor(Math.random() * letter.length));
            count++;
        }
        console.log(hash)
        return hash;
    }

    count(key)
    {
        const records = this.all(key);
        return records.length;
    }

    size(key, values)
    {
        const limit = 5200000;
        const current = this.storage.getItem(key);
        if(current !== null) {
            const range = current.length + JSON.stringify(values).length;
            if(range > limit) {
                alert("Você passou dos limites ;)");
                return false;
            }
        }
        return true;
    }

    all(key)
    {
        const records = this.storage.getItem(key);
        if(records === null) return [];
        return JSON.parse(records);
    }

    updatePin(key, id)
    {
        const records = this.all(key);
        records.filter((record) => {
            if(record.id === id) record.pin = !record.pin;
        });

        const ajusted = JSON.stringify(records);
        localStorage.setItem(key, ajusted);
    }

    save(key, value)
    {
        const records = this.all(key);
        
        let data = [];
        if(records.length > 0) {
            data = [ ...records, ...value];
        } else {
            data = [...value];
        }

        const ajusted = JSON.stringify(data);
        this.storage.setItem(key, ajusted);
    }
}