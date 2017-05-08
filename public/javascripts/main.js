(function () {
  /* global io */
  // Check if socket is available
  if (document.getElementById('socketScript')) {
    var socket = io();
    console.log(socket);
  }
})();