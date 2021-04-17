const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('message',(data)=>{
  server.send(data)
});

server.on('listening',()=>{
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
  console.log(address);
})

server.on('error',(err)=>{
  console.log(err);
  server.close()
})

server.bind(4080);
