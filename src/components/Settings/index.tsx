import React, { useContext, useEffect } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { useDisclosure } from "@chakra-ui/react";
import Context from "../../context";

const Settings: React.FC = () => {

  const { isOpen, onClose, onOpen } = useDisclosure()
  const { timer } = useContext(Context);
  const { isStarted, toggleStart } = timer;

  useEffect(() => {
    if (isOpen && isStarted) {
      toggleStart();
    }
  }, [isOpen, isStarted, toggleStart])

  return (
    <>
      <Button onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Settings;