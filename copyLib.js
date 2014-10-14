var copy = {};
var fs = require('fs');

copy.createDir = function(directory){
	if(!fs.existsSync(directory))  fs.mkdirSync(directory);
};

copy.filesInDirectory = function(directory){
	return fs.readdirSync(directory);
};

copy.removeDirectoryRecursively = function(directory){
	if(!fs.existsSync(directory)) return;

	var files = copy.filesInDirectory(directory);
	files.forEach(function(file){
		fs.unlinkSync(directory + '/' + file);
	});
	fs.rmdirSync(directory);
};

exports.copy = copy;

