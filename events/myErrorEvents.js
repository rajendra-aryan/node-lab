import EventEmitter from "events";

const eventEmitter = new EventEmitter()

eventEmitter.on('error',(err)=>{
    console.error(`Error occured: ${err}`);
    
})

eventEmitter.emit('error', new Error('Something went wrong'))