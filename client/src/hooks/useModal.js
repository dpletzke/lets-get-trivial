import { useState } from "react";

export default function useModal() {
  const [configModalIsOpen, setConfigIsOpen] = useState(false);
  const [rulesModalIsOpen, setRulesIsOpen] = useState(false);
  const [publicModalIsOpen, setPublicIsOpen] = useState(false);

  function openModal(name) {
    if (name === "config") {
      setConfigIsOpen(true);
    } else if (name === "rules") {
      setRulesIsOpen(true);
    } else if (name === "public") {
      setPublicIsOpen(true);
    }
  }

  function closeModal(name) {
    if (name === "config") {
      setConfigIsOpen(false);
    } else if (name === "rules") {
      setRulesIsOpen(false);
    } else if (name === "public") {
      setPublicIsOpen(false);
    }
  }

  return {
    configModalIsOpen,
    rulesModalIsOpen,
    publicModalIsOpen,
    closeModal,
    openModal,
  };
}
