import React, { useEffect, useState, useRef } from 'react';
import Home from './components/Home';
import './App.css';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080'

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState(String(Math.floor(Math.random() * 2) + 1));
  const connection = useRef(null);
  const firstUpdate = useRef(true);
  
  
  
  useEffect(() => {
    
    connection.current = socketIOClient(ENDPOINT);

    connection.current.on('initial', (data) => {
      setName(data.name);

      connection.current.emit('room', room);
    })

    connection.current.on('user_connected', data => {
      setUsers(data.users);
    })

    connection.current.on('user_disconnected', data => {
      setUsers(data.users);
    })

  }, [])

  useEffect(() => {

    console.log(firstUpdate.current);
    if (!firstUpdate.current) connection.current.emit('change_name', name);
    firstUpdate.current = false;

  }, [name])


  return (
    <>
      <Home onSave={setName} name={name} />
      <div className="App">
          <h3>{room}</h3>
          <h3>Users App</h3>
          <p>Our Name: {name}</p>
          <h3>Users Online</h3>
          {users.map((u, key) => <li key={key}>{u}</li>)}
      </div>
    </>
  );
}

export default App;