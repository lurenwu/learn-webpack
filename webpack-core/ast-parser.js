//1.sourceType module（不用严格模式 import）、script（严格模式）
//2.locations 记录源代码的行数
const acorn = require("acorn");
const result = acorn.parse("1 + 1",{
    //参数
});
console.log(result);
const walk = require("acorn-walk")
walk.simple(acorn.parse("let x = 10"), {
  Literal(node) {
    console.log(`Found a literal: ${node.value}`)
  }
})