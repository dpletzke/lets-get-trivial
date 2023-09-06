import Modal from "react-modal";
import { BsFillXCircleFill } from "react-icons/bs";

import modalStyles from "./modalStyles";

export default function ModalComponent({ modalIsOpen, closeModal, children }) {
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  return (
    <Modal
      ariaHideApp={false}
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
