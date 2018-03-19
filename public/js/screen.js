var socket;

window.onload = () => {
  socket = io.connect();
  
  socket.emit('spectatorConnected');
  
  socket.on('adjustImage', (data) => {
    var angle = data.deviceAngle;
    
    document.getElementById('imgPhone').style.transform = 'rotate(' + angle + 'deg)';
  });
};

window.onunload = () => {
  if(socket){
    socket.disconnect();
  }
};