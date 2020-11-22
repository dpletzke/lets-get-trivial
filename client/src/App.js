import React, { useEffect, useState, useRef } from 'react';
import Home from './components/Home';
import './App.css';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080'

function App() {

  const initialState = {
    name: '',
    users: [],
    room: null 
  } 
  const [state, setState] = useState(initialState);

  // const [name, setName] = useState('');
  // const [users, setUsers] = useState([]);
  // const [room, setRoom] = useState(null);
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
      setState(prev => ({...prev, users: data.users}));
    })

    connection.current.on('user_disconnected', data => {
      setState(prev => ({...prev, users: data.users}));
    })

  }, [])

  
  const onJoin = (name, gameId) => {
    let roomId = gameId
    if (!gameId) roomId = makeId(6)
    setState(prev => ({...prev, name}));
    setState(prev => ({...prev, roomId}));
    connection.current.emit('join_room', name, roomId);
  }

  const displayRoom = (room) => {
    if(room) {
      return (      
      <div className="App">  
        <h3>{room}</h3>
        <h3>Users App</h3>
        <p>Our Name: {state.name}</p>
        <h3>Users Online</h3>
        {state.users.map((u, key) => <li key={key}>{u}</li>)}
      </div>
      )
    }

  }

  return (
    <>
      <Home onJoin={onJoin} name={state.name} />
      {displayRoom(state.room)}
    </>
  );
}

export default App;