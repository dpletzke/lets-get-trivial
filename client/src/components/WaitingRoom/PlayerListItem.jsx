const playerObj = {
  name: 'Soren'
}

function PlayerListItem() {
  const {name} = playerObj;

  return (
    <div>
      <h1>PlayerListItem</h1>  
      <p>{name}</p>
    </div>
  ) 
}

export default PlayerListItem;