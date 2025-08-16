import fs from "fs"

console.log("Start of the script");

// [Sync] => Blocking Operations
// const reading =fs.readFileSync('notes.txt','utf-8')
// console.log(reading);
// //                      1min 1GB


// [Async] => Non Blocking
// fs.readFile('notes.txt','utf-8',function(error,data) {
//     if(error) console.log(error);
//     else console.log("Content got",data);
// })

console.log("End of the script");
