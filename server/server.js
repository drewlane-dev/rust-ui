var express = require('express');
var app = express();
app.use(express.static('./frontend'));
app.get('/', function (req, res,next) {
  res.redirect('/');
});
app.get('*', function(req, res) {
  res.sendfile('./frontend/index.html');
});

console.log(`starting server! ${process.env.PORT}`);
const fs = require('fs');

fs.readdir('./frontend', (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});

app.listen(process.env.PORT)


