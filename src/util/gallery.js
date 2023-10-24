import Cyberpunk from "../assets/img/cyberpunk.jpg";

export const gallery = {
    state: [
        {
            "id": "0mns",
            "path": Cyberpunk,
            "pin": false
        },
        {
            "id": "dmbz",
            "path": Cyberpunk,
            "pin": false
        }
    ],
    findPin: (value) => {
        const data = gallery.state.find(({id}) => id === value);
        return data;
    },
    getPin: () => {
        
    },
    setPin: () => { 
    
    },
    togglePin:(tagetId) => {
        const { id } = gallery.findPin(tagetId);
        gallery.state.filter((record) => {
            if(record.id === id) {
                record.pin = true;
            }
        })

        console.log(gallery);
    }
}