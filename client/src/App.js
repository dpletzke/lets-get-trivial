import React, { useEffect, useState, useRef } from 'react';
import Home from './components/Home';
import './App.css';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080'

function App() {

  const initialState = {
    name: '',
    users: [],
    roomId: null 
  } 
  const [state, setState] = useState(initialState);
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

  
  const onJoin = (name, roomId ) => {
    roomId = roomId || makeId(6);
    setState(prev => ({...prev, name, roomId}));

    connection.current.emit('join_room', name, roomId);
  }

  const displayRoom = ({ roomId, name, users }) => {
    console.log('Should be displaying', state.roomId)
    if(roomId) {
      return (      
      <div className="App">  
        <h3>{roomId}</h3>
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
      <Home onJoin={onJoin} name={state.name} />
      {displayRoom(state)}
    </>
  );
}

export default App;