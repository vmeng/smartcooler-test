var exec = require('child_process').exec; //command line tools
var rest = require('restler'); //sending REST requests
var fs = require('fs'); //File system commands

// IP Address
var address = require('./config').ipaddress;
// The 'rest.file()' command requires the file size in bytes
function getFileSizeInBytes(filename) {
  var stats = fs.statSync(filename)
  var fileSizeInBytes = stats['size']
  return fileSizeInBytes
}
var arguments = process.argv.slice(2);
var fullPath = arguments[0]
var shelf = arguments[1] || 1

var server = address + ':3000/smartcooler/data/picture_save';

rest.post(server, {
  multipart: true,
  data: {
    picture: rest.file(fullPath, null, getFileSizeInBytes(fullPath)),
    shelf: shelf
  }
}).on('complete', function(data, response) { 
  console.log('pic mongo status code: ' + response.statusCode);
  console.log('pic mongo status response: ' + response.response);
});

