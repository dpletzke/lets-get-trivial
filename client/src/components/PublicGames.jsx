import { useState, useContext, useEffect } from "react";
import ConnectionContext from "../ConnectionContext";
import PublicGameItem from "./PublicGameItem";
import { FaUsers } from "react-icons/fa";
import "./PublicGames.scss";

function PublicGames({setGameId, closeModal}) {
  const [publicGames, setPublicGames] = useState([]);

  const connection = useContext(ConnectionContext);

  useEffect(() => {
    connection.current.emit("get_public_games");

    connection.current.on("public_games", (data) => {
      const { publicGames } = data;

      setPublicGames(publicGames);
    });
    const oldConnection = connection.current;
    return () => {
      oldConnection.removeAllListeners("public_games");
    };
  }, [connection]);

  const output = publicGames.map((publicGame) => {
    return <PublicGameItem {...publicGame} setGameId={setGameId} closeModal={closeModal}/>;
  });

  return (
    <div className="publicGame__box">
      <h2 className="heading__primary">
        <FaUsers className="user-icon" /> Public Games
      </h2>
      <h3 className="heading__seconday">Click to access the game ID!</h3>
      <h4 className="heading__tertiary">Then enter your name and join the game room</h4>
      {/* <div className="category-heading">
        <p>Host Name</p>
        <p># of Players </p>
        <p>Game ID</p>
      </div> */}
      {output}
    </div>
  );
}

export default PublicGames;
