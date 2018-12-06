//1.转化ast babylon
//2.遍历ast babel-traverse require（webpack-require）
//3.转化的速度 ast 快一些babel-core 
const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const {transformFromAst} = require('babel-core');

let config = {}

/**
 * 获取文件，解析成ast语法
 * @param filename
 * @returns {*}
 */
function getAst (filename) {
  // 以字符串形式读取文件的内容. 
  const content = fs.readFileSync(filename, 'utf-8')
// 现在我们试图找出这个文件依赖于哪个文件。虽然我们可以通过查看其内容来获取import字符串. 然而,这是一个非常笨重的方法，我们将使用JavaScript解析器来代替。
  
// JavaScript解析器是可以读取和理解JavaScript代码的工具，它们生成一个更抽象的模型,称为`ast (抽象语法树)(https://astexplorer.net)`。
  return babylon.parse(content, {
    sourceType: 'module',
  });
}
//  我们遍历`ast`来试着理解这个模块依赖哪些模块，要做到这一点,我们需要检查`ast`中的每个 `import` 声明。
// `Ecmascript`模块相当简单,因为它们是静态的. 这意味着你不能`import`一个变量,或者有条件地`import`另一个模块。每次我们看到`import`声明时,我们都可以将其数值视为`依赖性`。
function getDependence (ast) {
  let dependencies = []
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value);
    },
  })
  return dependencies
}

/**
 * 编译
 * @param ast
 * @returns {*}
 */
//  我们使用`Ecmascript`模块和其他JavaScript,可能不支持所有浏览器。
//  为了确保我们的程序在所有浏览器中运行,
//  我们将使用[babel](https://babeljs.io)来进行转换。
//  我们可以用`babel-preset-env``将我们的代码转换为浏览器可以运行的东西. 
function getTranslateCode(ast) {
  const {code} = transformFromAst(ast, null, {
    presets: ['env']
  });
  return code
}

/**
 * 生成完整的文件依赖关系映射
 * @param fileName
 * @param entry
 * @returns {{fileName: *, dependence, code: *}}
 */
function parse(fileName, entry) {
  let filePath = fileName.indexOf('.js') === -1 ? fileName + '.js' : fileName
  let dirName = entry ? '' : path.dirname(config.entry)
  let absolutePath = path.join(dirName, filePath)
  const ast = getAst(absolutePath)
  return {
    fileName,
    dependence: getDependence(ast),
    code: getTranslateCode(ast),
  };
}

/**
 * 获取深度队列依赖关系
 * @param main
 * @returns {*[]}
 */
function getQueue(main) {
  let queue = [main]
  for (let asset of queue) {
    asset.dependence.forEach(function (dep) {
      let child = parse(dep)
      queue.push(child)
    })
  }
  return queue
}

function bundle(queue) {
  let modules = ''
  queue.forEach(function (mod) {
    modules += `'${mod.fileName}': function (require, module, exports) { ${mod.code} },`
  })

  const result = `
    (function(modules) {
      function require(fileName) {
        const fn = modules[fileName];

        const module = { exports : {} };

        fn(require, module, module.exports);

        return module.exports;
      }

      return require('${config.entry}');
    })({${modules}})
  `;

  // We simply return the result, hurray! :)
  return result;
}

function bundleFile(option) {
  config = option
  // let mainFile = parse(config.entry, true)
  let mainFile = { fileName: './index.js',
  dependence: ['./test.js'],
  code:
   '"use strict";\n\nvar result = require("./test.js");\n//const s = require("");\nresult();' }
  let queue = getQueue(mainFile)

  return bundle(queue)
}
// bundleFile({'entry': './index.js'})

module.exports = bundleFile
