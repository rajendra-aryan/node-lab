import { Buffer } from "buffer";

// const buff = Buffer.alloc(4)
// console.log(buff);


// const buff = Buffer.from("Rajendra")
// console.log(buff);
// console.log(buff.toString());


// const buff = Buffer.allocUnsafe(110)
// console.log(buff);


// const buff = Buffer.alloc(10)
// buff.write('Hello')
// console.log(buff.toString());


// const buff = Buffer.from("Hello World")
// console.log(buff.toString('utf-8',1,4));


// const buff = Buffer.from("Aryan")
// console.log(buff);
// buff[0] = 0x4A
// console.log(buff);
// console.log(buff.toString());


const buff1 = Buffer.from("Rajendra Aryan")
const buff2 = Buffer.from(" Sahu")
const merge = Buffer.concat([buff1,buff2])
console.log(merge.toString());
console.log(merge.length);
