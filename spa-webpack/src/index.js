import {
    sync
} from "./components/sync/index.js";
import(/* webpackChunkName: "async-test" */ './components/async/index.js').then(_=>{
    _.default.init();
}); 
console.log("Hello Chenlin Webpack");
sync();