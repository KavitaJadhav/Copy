var copy = require('./copyLib.js').copy;
var fs = require('fs');
var assert = require('assert');
var test = {};

test.CreateDirectotry_create_directory_if_not_exist = function(){
	var directory = './ABC';
	copy.removeDirectoryRecursively(directory);

	assert.equal(false,fs.existsSync(directory));
	copy.createDir(directory);
	assert.equal(true,fs.existsSync(directory));
};

test.removeDirectoryRecursively_remove_directory_with_all_files_it_contains = function(){
	var directory = './NEW';
	copy.createDir(directory);

	fs.writeFileSync('./NEW/one.txt', "Hello");

	assert.equal(true,fs.existsSync(directory));
	copy.removeDirectoryRecursively(directory);
	assert.equal(false,fs.existsSync(directory));
};

test.copyFileToDestination_copy_file_from_destination_to_sourse = function(){
	var sourse = './PQR';
	var destination = './XYZ';
	
	copy.removeDirectoryRecursively(sourse);
	copy.removeDirectoryRecursively(destination);

	copy.createDir(sourse);
	copy.createDir(destination);

	fs.writeFileSync('./PQR/one.txt', "Hello");
	var fileName = 'one.txt';

	assert.deepEqual([],copy.filesInDirectory(destination));

	copy.copyFileToDestination(sourse , destination , fileName);

	assert.deepEqual(['one.txt'],copy.filesInDirectory(destination));
};

test.copyFiles_copy_all_files_from_destination_to_sourse = function(){
	var sourse = './PQR';
	var destination = './XYZ';
	
	copy.removeDirectoryRecursively(sourse);
	copy.removeDirectoryRecursively(destination);

	copy.createDir(sourse);
	copy.createDir(destination);

	fs.writeFileSync('./PQR/one.txt', "Hi");
	fs.writeFileSync('./PQR/two.txt', "Hello");

	assert.deepEqual([],copy.filesInDirectory(destination));

	copy.copyFiles(sourse , destination);

	assert.deepEqual(['one.txt' , 'two.txt'],copy.filesInDirectory(destination));
};

exports.test = test;
