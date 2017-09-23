const parse5 = require('parse5');
const adapter = require('handlebars-live-templates-ast');
const generator = require('handlebars-live-templates-generator-idom');
const fs = require('fs');
const beautify = require('js-beautify').js_beautify;

var compile = (source, target) => {
    fs.readFile(source, 'utf8', function (error, templateString) {
        if (error) return console.log(error);

        const documentFragment = parse5.parseFragment(templateString, {treeAdapter: adapter});
        let funcString = generator.GenerateRenderFunction(documentFragment);
        funcString = beautify(funcString, {indent_size: 2});

        fs.writeFile(target, funcString, function(err) {
            if(err) return console.log(err);
            console.log("Handlebars AST generated from file.");
        }); 
    });
}
module.exports = compile;

// Use like this: node parse.js [source_file_location] [target_file_location]
// Example: node parse.js ./source.hb.html ./target.js
// If the source file cannot be found, we will throw an error
// If the target file cannot be found, we attempt to create it

// Take command line arguments
var source = process.argv[2]; // First: Source file (file to compile)
var target = process.argv[3]; // First: Target file (file to write to)

if(!source) console.error('No source argument provided. Usage: node parse.js [source_file_location] [target_file_location]');
if(!target) console.error('No source argument provided. Usage: node parse.js [source_file_location] [target_file_location]');

if(source && target) {
    compile(source, target);
}