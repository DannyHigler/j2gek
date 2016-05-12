
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , board = require('./routes/board')
  , http = require('http')
  , path = require('path');

var request = require('request');
var jira = require('./jira');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.get('/', routes.index);
app.get('/board', board.list);


app.get('/board/:board_id', function (req, res) {
    var board_id = req.params.board_id;
    jira.getCurrentSprint(board_id);
    res.end('done');
});



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
