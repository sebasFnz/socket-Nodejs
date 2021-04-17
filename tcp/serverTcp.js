const net = require('net');
const server = net.Server();
let port = 5080;

const usersConn = new Map();

const userMessage = (data, emmiter) => {
  for (var user of usersConn.keys()) {
    if (user !== emmiter) {
      user.write(data);
    }
  }
}

server.on("connection",(socket)=>{
  const remoteConnection = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`new connection from ${remoteConnection}`);

  socket.setEncoding('utf-8');
  socket.setMaxListeners(1);

  socket.on("data",(data)=>{
    if (!usersConn.has(socket)) {
      console.log(`new connection from ${remoteConnection}, user ${data}`);
      usersConn.set(socket,data);
    }

    switch (data) {
      case 'FINISH':
        console.log(`From ${remoteConnection} is desconect`);
        usersConn.delete(socket);
        socket.end();
        break;
      default:
        let message = `${usersConn.get(socket)}: ${data}`
        console.log(`${message} |${remoteConnection} - -> ${data} `);
        userMessage(message,socket);
    }

  })

});

server.on("error",(err)=>{
  console.error(err);
})

server.listen({port, host:'0.0.0.0'},()=>{
  console.log(`listen on port ${port}`);
})
