let sum = 0
let i =1
while (i<10) {
    sum+=i
    i++
}


let power =[]
let hp
do {
    hp = prompt(`Enter powers (type "stop" to stop)`)
    if (hp!="stop") {
        power.push(hp)
    }
} while (power!="stop"); //go to browser for this...