import { useState, useEffect } from "react";

export default function useHomeData(connection, onJoin, onCreate) {
  const [hostName, setHostName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [gameId, setGameId] = useState(null);
  const [error, setError] = useState(false);

  function createGame(isPublic) {
    if (!hostName) {
      setError(1);
    } else {
      setError(false);
      onCreate(hostName, isPublic);
    }
  }

  function joinGame() {
    if (!playerName) {
      setError(2);
    } else if (!gameId) {
      setError(3);
    } else {
      connection.current.emit("get_room_info");
    }
  }

  useEffect(() => {
    if (connection.current.id) {
      connection.current.on("room_info", (data) => {
        const openRooms = data.roomInfo.filter((r) => !r.started);
        if (openRooms.find((r) => r.roomId === gameId)) {
          setError(false);
          onJoin(playerName, gameId);
        } else {
          setError(4);
        }
      });
      const oldConnection = connection.current;
      return () => {
        oldConnection.removeAllListeners("room_info");
      };
    }
  }, [connection, gameId, playerName, onJoin]);

  return {
    hostName,
    setHostName,
    playerName,
    setPlayerName,
    gameId,
    setGameId,
    error,
    createGame,
    joinGame,
  };
}
