import { useState } from "react";

export default function useModal() {
  const [configModalIsOpen, setConfigIsOpen] = useState(false);
  const [rulesModalIsOpen, setRulesIsOpen] = useState(false);

  function openModal(name) {
    if (name === "config") {
      setConfigIsOpen(true);
    } else if (name === "rules") {
      setRulesIsOpen(true);
    }
  }

  function closeModal(name) {
    if (name === "config") {
      setConfigIsOpen(false);
    } else if (name === "rules") {
      setRulesIsOpen(false);
    }
  }

  return { configModalIsOpen, rulesModalIsOpen, closeModal, openModal };
}
