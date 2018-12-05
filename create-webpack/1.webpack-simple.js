const fs = require("fs");
let input = './src/index.js';
let output = './dist/main.js';
const ejs = require('ejs')
const getIntry = fs.readdirSync('input','utf-8')