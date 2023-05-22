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
    brand: {
      light: "#90CDF4",
      dark: "#0077B6",
    },
    accent: {
      light: "#FCD34D",
      dark: "#F59E0B",
    },
    neutral: {
      light: "#F5F5F5",
      dark: "#1F2937",
    },
    success: {
      light: "#34D399",
      dark: "#10B981",
    },
    danger: {
      light: "#EF4444",
      dark: "#DC2626",
    },
    primary: {
      light: "#F5F5F5",
      dark: "#1A202C",
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
      },
    },
  },
};

export default extendTheme(theme);
