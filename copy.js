
var copy = require('./copyLib.js').copy;
var fs = require('fs');

var main = function() {
	var arguments = process.argv.slice(2,process.argv.length);
	copy.copyFiles(arguments[0] , arguments[1] , arguments[2]);
};

main();