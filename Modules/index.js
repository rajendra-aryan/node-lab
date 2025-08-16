import fs from "fs";

const reading = fs.readFileSync('notes.txt','utf-8')

console.log(reading);


// fs.writeFileSync('copy.txt','hello there','utf-8')
// fs.appendFileSync('copy.txt','\n\nheyyy','utf-8')

// fs.mkdirSync('games/xyz/a',{recursive:true})
// fs.rmdirSync('games')

// fs.unlinkSync('copy.txt') 