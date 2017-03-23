import express from 'express';
import http from 'http';
import socketIo from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let guests = [];
let id_counter = 0;

io.on('connection', (socket) => {
  let _guest = { id: id_counter++, name: "mickey mouse", score: 0};
  guests.push(_guest);
  console.log(`>> New guest called ${_guest.name}`);
  console.log(`>> There are ${guests.length} guests online`);

  socket.on('disconnect', (data) => {
    let index = guests.indexOf(_guest);
    if (index > -1) {
      guests.splice(index, 1);
    }

    console.log(`>> ${_guest.name} disconnected`);
    console.log(`>> There are ${guests.length} guests online`);
  });
});


app.listen(8080);
