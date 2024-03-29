import React, { useEffect, useState, useRef } from "react";
import { ConnectionProvider } from "./ConnectionContext";
import Home from "./components/Home";
import WaitingRoom from "./components/WaitingRoom";
import socketIOClient from "socket.io-client";

const serverUrl = import.meta.env.VITE_SERVER_URL;

function App() {
  const initialState = {
    name: "",
    users: [],
    roomId: null,
  };
  const [state, setState] = useState(initialState);
  const connection = useRef({ id: null });

  const makeId = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  useEffect(() => {
    connection.current = socketIOClient(serverUrl);

    connection.current.on("user_connected", (data) => {
      setState((prev) => ({ ...prev, users: data.users }));
    });

    connection.current.on("user_disconnected", (data) => {
      setState((prev) => ({ ...prev, users: data.users }));
    });

    connection.current.on("disconnect", (reason) => {
      setState((prev) => ({ ...prev, roomId: null }));
    });
  }, []);

  const onJoin = (name, roomId) => {
    setState((prev) => ({ ...prev, name, roomId }));

    connection.current.emit("join_room", name, roomId);
  };

  const onCreate = (name, isPublic) => {
    const roomId = makeId(6);

    setState((prev) => ({ ...prev, name, roomId }));

    connection.current.emit("join_room", name, roomId, isPublic);
  };

  const onLeave = () => {
    setState((prev) => ({ ...prev, roomId: null }));

    connection.current.emit("leave_room");
  };

  const controller = (state) => {
    const { roomId, name, users } = state;

    if (roomId) {
      return <WaitingRoom players={users} gameId={roomId} onLeave={onLeave} />;
    } else {
      return <Home onJoin={onJoin} onCreate={onCreate} name={name} />;
    }
  };

  return (
    <ConnectionProvider value={connection}>
      {controller(state)}
    </ConnectionProvider>
  );
}

export default App;
