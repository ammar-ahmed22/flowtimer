import { modalAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(modalAnatomy.keys);

const brand = definePartsStyle({
  dialog: {
    bg: "beige.200",
    _dark: {
      bg: "brandGray.700"
    }
  },
  header: {
    textAlign: "center",
    borderColor: "beige.300",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    textTransform: "uppercase",
    color: "beige.700",
    _dark: {
      borderColor: "brandGray.600",
      color: "brandGray.300"
    }
  },
  closeButton: {
    color: "beige.700",
    _dark: {
      color: "brandGray.300"
    }
  }
})

const modalTheme = defineMultiStyleConfig({
  variants: { brand }
})

export default modalTheme;
