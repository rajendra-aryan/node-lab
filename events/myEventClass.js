import EventEmitter from "events";

class Chat extends EventEmitter{
    sendMessage(msg){
        console.log(`Message sent: ${msg}`);
        this.emit("MessageRecived", msg)
    }
}

const chat = new Chat()
chat.on("MessageRecived", ()=>{
    console.log(`New message: ${msg}`);
    
})

chat.sendMessage("Hello Rajendra")