import { useState } from "react";

export default function useModal() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return { modalIsOpen, closeModal, openModal };
}
