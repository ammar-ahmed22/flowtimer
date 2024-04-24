import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";
import colors from "./foundations/colors";
import fonts from "./foundations/fonts";

import Button from "./components/button";
import Modal from "./components/modal";
import NumberInput from "./components/numberInput";
import Select from "./components/select";

const overrides = {
  colors,
  styles,
  fonts,
  components: {
    Button,
    Modal,
    NumberInput,
    Select
  }
};

export default extendTheme(overrides);