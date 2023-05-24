import { Alfa_Slab_One } from "next/font/google";
import { Montserrat_Alternates } from "next/font/google";
import { Rampart_One } from "next/font/google";
import { extendTheme } from "@chakra-ui/react";

const montserrat = Montserrat_Alternates({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const alfaSlabOne = Alfa_Slab_One({
  weight: ["400"],
  subsets: ["latin"],
});
const rampartOne = Rampart_One({
  weight: ["400"],
  subsets: ["latin"],
});

const theme = {
  colors: {
    primary: {
      background: "#fffffe",
      Heading: "#094067",
      Paragraph: "#5f6c7b",
      Button: "#3da9fc",
    },
    secondary: {
      background: "#D8EEFE",
      Heading: "#fffffe",
      Paragraph: "#3da9fc",
      dark: "#094067",
    },
  },
  fonts: {
    Montserrat_Alternates: montserrat.style.fontFamily,
    Alfa_Slab_One: alfaSlabOne.style.fontFamily,
    Rampart_One: rampartOne.style.fontFamily,
  },
  styles: {
    global: {
      body: {
        fontFamily: "Montserrat_Alternates",
        bg: "primary.background",
      },
    },
  },
};

export default extendTheme(theme);
