const fs = require("fs");
let input = "./index.js";
let output = "./dist/main.js";
const ejs = require("ejs");
const getIntry = fs.readFileSync(input, "utf-8");
const bundleFile = require('./webpack-ast')
const ora = require('ora');
//对模块排序 //Chunk->Dependency->Template
//依赖关系
const spinner = ora('开始构建项目文件').start();
var template = bundleFile({'entry': './index.js'})
let result = ejs.render(template);

fs.writeFileSync(output,result);
setTimeout(function(){
    spinner.succeed("构建成功");
},1000);
