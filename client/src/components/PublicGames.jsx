import { useState, useContext, useEffect } from "react";
import ConnectionContext from "../ConnectionContext";
import PublicGameItem from './PublicGameItem';
import { FaUsers } from "react-icons/fa";
import './PublicGames.scss'

function PublicGames() {

  const [publicGames, setPublicGames] = useState([]);

  const connection = useContext(ConnectionContext);

  useEffect(() => {

    connection.current.emit('get_public_games');

    connection.current.on('public_games', data => {
      const { publicGames } = data;
      
      setPublicGames(publicGames);
    })
    const oldConnection = connection.current;
    return (() => {
      oldConnection.removeAllListeners("public_games");
    })

  }, [connection])

  const output = publicGames.map(publicGame => {
      return <PublicGameItem {...publicGame}/>
    });
  

  return (
    <div className="game-id-container">
    <h2><FaUsers className="user-icon" /> Public Games</h2>
    <h3>Copy a game Code and join a room!</h3>
    <div>
      <p>Name</p>
      <p>Players</p>
      <p>Game ID</p>
    </div>
    {output}
    </div>
  );
}

export default PublicGames;