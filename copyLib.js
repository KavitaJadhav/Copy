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

copy.copyFileToDestination = function(sourse , destination , file){
	var writeLocation = destination +'/'+ file;
	if(fs.existsSync(writeLocation)) return ;
	
	var text = fs.readFileSync(sourse + '/' + file);
	console.log("\n.........Copying "+ file + " to " + destination)
	fs.writeFileSync(writeLocation, text);
};

copy.copyFiles = function(sourse , destination , option){

	if(option == '--all') copy.removeDirectoryRecursively(destination);
	copy.createDir(destination);

	var sourseFiles = copy.filesInDirectory(sourse);
	sourseFiles.forEach(function(file){
		copy.copyFileToDestination(sourse , destination , file);
	})
};

exports.copy = copy;

