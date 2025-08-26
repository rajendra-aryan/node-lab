const add = function add(a,b){
    return a+b
}
const sub = function sub(a,b){
    return a-b
}
const mul = function mul(a,b){
    return a*b
}
const div = function div(a,b){
    return a/b
}

//Named exports
export{add, sub, mul, div}

//Default exports
export const myfun = function(){};