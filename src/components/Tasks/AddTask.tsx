import React, { useContext } from "react";
import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";
import Context from "../../context";
import { FaPlus } from "react-icons/fa6";
import { uuid } from "../../utils/id";

export type AddTaskProps = ButtonProps & {}

const AddTask: React.FC<AddTaskProps> = ({
  ...others
}) => {
  const { addTask } = useContext(Context)
  return (
    <Button
      variant="ghost"
      fontWeight="normal"
      color={useColorModeValue("brandGray.600", "brandGray.300")}
      leftIcon={<FaPlus />}
      pt="0"
      borderRadius="0"
      _hover={{
        color: useColorModeValue("brandGray.900", "brandGray.100"),
      }}
      _active={{}}
      onClick={() => {
        addTask({
          id: uuid(),
          desc: "",
          complete: false
        })
      }}
      {...others}
    >
      Add Task
    </Button>
  )
}

export default AddTask;