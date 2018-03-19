var socket;

window.onload = () => {
  socket = io.connect();
  
  socket.emit('deviceConnected');
  
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleDeviceOrientation, false);
  }
  
  function handleDeviceOrientation(event) {
    //This represents a left to right motion of the device (the gamma).
    var gamma = Math.round(event.gamma);
    
    document.getElementById('deviceAngle').innerHTML = gamma + '°';
    
    socket.emit('angleChanged', {
      deviceAngle: gamma
    });
  }
  
};

window.onunload = () => {
  if(socket){
    socket.disconnect();
  }
};