import React, { useEffect, useState, useRef } from 'react';
import Home from './components/Home';
import './App.css';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080'

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState(null);
  const connection = useRef(null);
  
  const makeId = (length) => {
    let result     = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  
  
  useEffect(() => {
    
    connection.current = socketIOClient(ENDPOINT);

    connection.current.on('user_connected', data => {
      setUsers(data.users);
    })

    connection.current.on('user_disconnected', data => {
      setUsers(data.users);
    })

  }, [])

  
  const onJoin = (name, gameId) => {
    let roomId = gameId
    if (!gameId) roomId = makeId(6)
    setName(name);
    setRoom(roomId);
    connection.current.emit('join_room', name, roomId);
  }

  // const onCreate = (newName) => {
  //   setName(newName);
  //   connection.current.emit('create_game', newName);
  // }
console.log(room)
  const displayRoom = (room) => {
    if(room) {
      return (      
      <div className="App">  
        <h3>{room}</h3>
        <h3>Users App</h3>
        <p>Our Name: {name}</p>
        <h3>Users Online</h3>
        {users.map((u, key) => <li key={key}>{u}</li>)}
      </div>
      )
    }

  }

  return (
    <>
      <Home onJoin={onJoin} name={name} />
      {displayRoom(room)}
    </>
  );
}

export default App;