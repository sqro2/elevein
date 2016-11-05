 var path = require('path');
 var parser = require(path.join(__dirname,'/cust_modules/parser.js'));
 var code_gen = require(path.join(__dirname,'/cust_modules/code_gen.js'));
 parser.init(process.argv);
 code_gen.init();
