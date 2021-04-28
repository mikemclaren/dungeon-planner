import { DeepPartial, extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: DeepPartial<ThemeConfig> = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({ config })

export default theme