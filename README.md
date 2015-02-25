# Documark Cache

Documark helper functions for working with cache files.

When running `var cache = require('documark-cache')(document);` the following happens:

1. The cache helper will use given `document` for resolving paths.
2. A cache folder (`.documark/`) will be created in your document directory.
3. This directory will also be set as wkhtmltopdf its `--cache-dir`.

### Usage

1. Load cache helper:

	```js
	var cache = require('documark-cache')(document);
	```

2. Use the cache helper in your plugins:

	```js
	var fs = require('fs');

	module.exports = function dmpPluginNameHere ($, document, done) {
		var cache = require('documark-cache')(document);

		// Folder path:
		var folderPath = cache.folderPath();
		// Path to <document root>/.documark/

		// File path:
		var filePath = cache.filePath('myfile.json');
		// Path to <document root>/.documark/myfile.json

		fs.writeFileSync(filePath, 'some content');

		// Read file:
		var file = cache.fileReadStream('my-cache-file.json');

		file.on('data', function (chunk) { ... });
		file.on('end', function () { ... });
		file.resume();

		// Or pipe to other stream: file.pipe(other);

		// Write to file:
		var file = cache.fileWriteStream('my-cache-file.json');

		file.end(JSON.stringify({ hello: 'world!' });
		// file.path contains the stream it's file path string

		done();
	};
	```

__Note:__ Don't worry about unsafe file names, they will be [sanitized automatically][sanitize-filename].

[sanitize-filename]: https://www.npmjs.com/package/sanitize-filename
