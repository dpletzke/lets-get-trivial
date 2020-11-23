import {useState} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const {modalStyles} = require('./modalStyles');


export default function DialogueBox(props) {
  let subtitle;
  //this should eventually be set in the parent element and passed as props
  const [modalIsOpen,setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    setIsOpen(false);
  }
  return (
    <div>
    <button onClick={openModal}>Open Modal</button>
    <Modal
           isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Example Modal"
          >
          
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
          </Modal>

          </div>
  )
}