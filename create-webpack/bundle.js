(function(modules){
    function  __webpack_require__(moduleId){
        const module ={
            exports:{}
        }
        console.log(modules[moduleId],module.exports);
        //函数体
        modules[moduleId].call(module.exports,module, module.exports, __webpack_require__);
        return module.exports;
    }
    console.log(1)
    return __webpack_require__(0);
})([(function(module,exports,__webpack_require__){
    console.log(2);

    var result = __webpack_require__(1);
    console.log(result)
    result();
}),(function(module,exports){
    console.log(3);

    module.exports = function(){
    console.log(4);

        console.log(456);
    };
})]);