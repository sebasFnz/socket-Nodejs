const net = require('net');
const readline = require('readline');
const socket = net.Socket();

const rl = readline.createInterface({
  input: process.stdin
  ,output: process.stdout
})


socket.connect({host: 'localhost',port: 5080});
socket.setEncoding('utf-8');

socket.on("connect",()=>{
  console.log('connected');

  rl.question("Escoge un nombre de usuario: ",(name)=>{
      socket.write(name);
      console.log("Escribe 'FINARLIZAR' para cerrar");
  })

  rl.on("line",(line)=>{
    socket.write(line);
    if (line === 'FINISH') {
      socket.end();
    }
  })

  socket.on("data",(data)=>{
    console.log("R:",data);
  })
});

socket.on("close",()=>{
  rl.close();
  console.log("Desconected ...");
})
