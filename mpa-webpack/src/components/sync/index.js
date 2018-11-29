import lodash from "lodash-es"
import item from './sync.css'
const sync = function (){
    console.log('sync')
    document.getElementById('app').innerHTML= `<h1 class="${item.test}">Hello Chenlin</h1>`
}

const isArraysFun =  function(args){
   return lodash.isArray(args)
}
export {
    sync,
    isArraysFun
}