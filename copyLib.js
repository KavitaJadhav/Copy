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
	var path;

	files.forEach(function(file){
		path = directory + '/' + file;
		if(fs.lstatSync(path).isDirectory()) return copy.removeDirectoryRecursively(path);
		fs.unlinkSync(directory + '/' + file);
	});
	fs.rmdirSync(directory);
};

copy.copyFileToDestination = function(source , destination , file){
	var writeLocation = destination +'/'+ file;
	var readLocation = source + '/' + file;

	if(fs.lstatSync(readLocation).isDirectory()) return copy.copyFiles(readLocation , writeLocation);
	if(fs.existsSync(writeLocation)) return ;
	
	var text = fs.readFileSync(readLocation);
	console.log("\n.........Copying "+ file + " to " + destination)
	fs.writeFileSync(writeLocation, text);
};

copy.copyFiles = function(source , destination , option){

	if(option == '--all') copy.removeDirectoryRecursively(destination);
	copy.createDir(destination);

	var sourceFiles = copy.filesInDirectory(source);
	sourceFiles.forEach(function(file){
		copy.copyFileToDestination(source , destination , file);
	})
};

exports.copy = copy;

