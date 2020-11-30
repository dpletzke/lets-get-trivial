import Modal from "react-modal";
import { BsFillXCircleFill } from "react-icons/bs";

const { modalStyles } = require("./modalStyles");

export default function ModalComponent({ modalIsOpen, closeModal, children }) {
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Example Modal"
    >
      <BsFillXCircleFill onClick={closeModal} />
      {children}
    </Modal>
  );
}
