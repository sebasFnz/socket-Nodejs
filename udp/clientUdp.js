const dgram = require('dgram');
const client = dgram.createSocket('udp4');

var host = "localhost";
var port = 5080;

process.stdin.on('data',(data)=>{
  client.send(data,port,host);
})

client.on('message',(data)=>{
  process.stdout.write(data+"");
});

client.on('error',(err)=>{
  console.log(`Error ${err} ${host}:${port}`);
  client.close();
  process.exit();
})

process.stdin.resume();
client.bind(port);
