import React, { useEffect, useState } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080'
const connection = socketIOClient(ENDPOINT);

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState(String(Math.floor(Math.random() * 2) + 1));
  
  useEffect(() => {

    connection.on('initial', (data) => {
      setName(data.name);

      connection.emit('room', room);
    })

    connection.on('user_connected', data => {
      setUsers(data.users);
    })

    connection.on('user_disconnected', data => {
      setUsers(data.users);
    })


  }, [])

  const handleSwitchRoom = (event) => {
    event.preventDefault();
    const newRoom = event.target.value;
    console.log('switchRoom:', newRoom);
    setRoom(newRoom)
    connection.emit('switch_room', newRoom)
  }

  return (
    <div className="App">
        <h3>{room}</h3>
        <form onSubmit={handleSwitchRoom}>
          <input type='text' />
          <input type='submit' />
        </form>
        <h3>Users App</h3>
        <p>Our Name: {name}</p>
        <h3>Users Online</h3>
        {users.map((u, key) => <li key={key}>{u}</li>)}
    </div>
  );
}

export default App;