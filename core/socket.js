/**
 *
 *
 * @param {*} io Socket io variable
 */
function Socket(io) {
  io.sockets.on("connection", function(socket) {
    // socket.on("pageOpen", function(request) {
    //   socket.broadcast.emit("pageOpened", request);
    // });
  });
}

module.exports = Socket;
