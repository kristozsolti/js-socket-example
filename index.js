var express = require('express');
var app = express(); 
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

//Static content
app.use(express.static('public'));

//App views
var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', './src/views/');

app.get('/', (req, res) => {
  res.render('screen', {
    text: 'Rendered via templates'
  });
});

app.get('/device', (req, res) => {
  res.render('device');
});

//Socket events
io.sockets.on('connection', (socket) => {
  //have not used socket.join for separate room
  
  //Action if spectator screen is connected
  socket.on('spectatorConnected', () => {
    console.log('A spectator is connected.');
  });
  //Action if a remote decice is connected
  socket.on('deviceConnected', () => {
    console.log('A remote device is connected.');
  });
  //Action if the Device's Angle changes
  socket.on('angleChanged', (data) => {
    //var angle = data.deviceAngle;
    io.emit('adjustImage', data);
    
  });
  
});

//Setting server to listen
server.listen('3001', (err) => {
  if(!err){
    console.log('Server is running...');
  }
});