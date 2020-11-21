<<<<<<< Updated upstream
function Home() {
  return (
   <h1>Home Component</h1>
=======
import {useState} from 'react'
import Button from './Button';
// import logo from '../images/logo.jpg'

import './Button.scss'
import './Home.scss'

function Home(props) {
  const [nameInput, setNameInput] = useState(props.name || "");
  const {onSave} = props
  // const { setName, name } = props;
  return (
  
    
      <section className="box-home">
   <h1>Let's Get Trivial</h1>
   
 
   <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            data-testid="player-name-input"
            name="name"
            type="text"
            placeholder="Enter Player Name"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
          />
          <Button onClick={()=> onSave(nameInput)} home>Create New Game</Button>
        </form>  
        </section>
  
   
    
   
>>>>>>> Stashed changes
  );
}

export default Home;