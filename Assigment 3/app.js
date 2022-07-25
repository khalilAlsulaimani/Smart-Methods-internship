var http = require('http');
var fs = require('fs');
var index=fs.readFileSync('index.html');

var SerialPort = require("serialPort");
const parsers = SerialPort.parser;
const parser = new parsers.Readline({ delimiter: "\r\n" });
//                     add path to ardino here
var port  = SerialPort('path to arduino.ino',{
baudRate: 9600,
dataBits: 8,
parity:'none',
stopBits:1,
flowControl: false
});

port.pipe(parser);



var app = http.createServer(function(req,res){
    res.writeHead(200,{'content-type': 'text/html'});
    res.end(index);
});

var io= require('socket.io').listen(app);
io.on('connection',function(data){
    cosnole.log('node js is listining');
});

parser.on('data', function(data){
    cosnole.log(data);
    io.emit('data',data);
});



app.listen(3000);