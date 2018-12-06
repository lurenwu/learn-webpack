/**
 * webpack主运行流程
 * 1.Compiler(Tapable)->Compilation(Tapable)-->Chunk->
 * 2.Module->runloaders->Dependency(AST)->Template
 */
//

//Chunk->Dependency->Template
const fs = require("fs");
let input = "./index.js";
let output = "./dist/main.js";
const ejs = require("ejs");
const getIntry = fs.readFileSync(input, "utf-8");

let template = `(function(modules){
    function  __webpack_require__(moduleId){
        const module ={
            exports:{}
        }
        //函数体
        modules[moduleId].call(module.exports,module, module.exports, __webpack_require__);
        return module.exports;
    }
    return __webpack_require__(0);
})([(function(module,exports){
    <%- getIntry %>
})]);`;

let result = ejs.render(template,{
    getIntry
});
fs.writeFileSync(output,result);




