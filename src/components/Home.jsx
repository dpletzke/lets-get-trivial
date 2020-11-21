import {useState} from 'react'
import Button from './Button';
// import logo from '../images/logo.jpg'

import './Button.scss'
import './Home.scss'

function Home(props) {
  const [name, setName] = useState(props.name || "");
  return (
  
    
      <section className="box-home">
   <h1>Let's Get Trivial</h1>
   <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Player Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button home>Create New Game</Button>
        </form>  
        </section>
  
   
    
   
  );
}

export default Home;