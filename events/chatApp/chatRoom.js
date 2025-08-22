import EventEmitter from "events";

class ChatRoom extends EventEmitter{
    constructor(){
        super()
        this.users = new Set();

    }

    join(user){
        this.users.add(user)
        this.emit('join')
    }

    sendMessage(user,message){
        if(this.users.has(user)){
            this.emit('message', user, message)
        }else{
            console.log(`${user} is not in the chat`);
            
        }   
    }

    leave(user){
        if(this.users.has(user)){
            this.users.delete(user)
            this.emit('leave',user)
        }else{
            console.log(`${user} is not in the chat`);
            
        }
    }
}

export default ChatRoom