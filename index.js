var fs       = require('fs');
var path     = require('path');
var sanitize = require('sanitize-filename');

module.exports = function helperCache (document) {
	// Helper functions
	var functions = {
		folderPath: function () {
			return path.join(document.path(), '.documark');
		},

		filePath: function (file) {
			return path.join(this.folderPath(), sanitize(file));
		},

		fileReadStream: function (file) {
			return fs.createReadStream(this.filePath(file));
		},

		fileWriteStream: function (file) {
			return fs.createWriteStream(this.filePath(file));
		}
	};

	// Create cache folder
	var cacheFolder = functions.folderPath();

	if ( ! fs.existsSync(cacheFolder)) {
		fs.mkdirSync(cacheFolder, 0755);
	}

	// Set WkHTMLToPDF cache dir
	document.config().pdf.cacheDir = cacheFolder;

	return functions;
};
