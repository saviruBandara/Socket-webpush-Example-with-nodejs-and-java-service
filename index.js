var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var url = require('url');
var querystring = require('querystring');
var port = process.env.PORT || 9857;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/',function (request,response) {
    response.sendFile(__dirname + '/index.html');
});
app.post('/', function (request, res) {
    try {
        var strBody = request.body;
        console.log(strBody);

        io.emit('webpush', strBody);

    } catch (ex) {
        console.dir(ex);
    }
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
