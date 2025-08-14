let nums =[1,2,3,5,6]
let Nums =[]
for (const ele of nums) {
    Nums.push(ele)
}



let cities= {
    London:"202",
    "New York":"2392",
    Berlin:"30321"
}
let population ={}
for (const city in cities) {
    if(city=="Berlin"){
        break
    }
}



let heros=["doga","shaktiman","aryaman","nagraj"]
let nothero=[]
heros.forEach(ele => {
    if (ele=="doga") {
        return
    }
    nothero.push(ele)
});