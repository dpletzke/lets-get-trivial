import React, { useEffect, useState } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080'

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  // 
  useEffect(() => {
    const connection = socketIOClient(ENDPOINT);
    connection.on('initial', (data) => {
      console.log(data);
      setName(data.name);
      setUsers(data.users);

      const room = String(Math.floor(Math.random(2)) + 1)

      socket.emit('room', room);
    })

    connection.on('user_connected', data => {
      setUsers(data.users);
    })

    connection.on('user_disconnected', data => {
      // console.log(data)
      setUsers(data.users);
    })

    socket.on('create', function (room) {
      socket.join(room);
    });

    var socket = io.connect();
    socket.emit('create', 'room1');

// // server side code
// io.sockets.on('connection', function(socket) {
//   socket.on('create', function(room) {
//     socket.join(room);
//   });
// });

    connection.emit('greetings', {msg: 'hi'});
  }, [])


  return (
    <div className="App">
        <h3>Users App</h3>
        <p>Our Name: {name}</p>
        <h3>Users Online</h3>
        {users.map((u, key) => <li key={key}>{u}</li>)}
    </div>
  );
}

export default App;