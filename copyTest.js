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

exports.test = test;
