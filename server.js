var express = require('express');
var app = express();

//app.use(express.static('./public'))
app.use(express.static('./public'));

app.use(function(req, res) {
  //res.sendFile(__dirname + '/public/index.html');
  res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(4000, function () {

  var port = server.address().port;
  console.log('analytics app started on http://localhost:' + port);

});
