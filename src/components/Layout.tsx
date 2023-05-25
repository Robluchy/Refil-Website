import Head from "next/head";
import Navbar from "@/components/ui/Navbar";
import { Box } from "@chakra-ui/react";
import Footer from "./Footer";
import { Transition } from "./animations/Transition";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "REFIL"}</title>
        <meta name="description" content={"Informacion sobre" || title} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="keywords"
          content="Refil, Reciclaje, Reciclar, 3D Printing, Impresion 3D, Impresion, Filament 3D, Filamento 3D, Filamento, Filament, 3D, Impresora 3D, Impresora"
        />

        <meta property="og:title" content={`Informacion sobre ${title} `} />
        <meta
          property="og:description"
          content={`Esta es la pagina sobre  ${title} `}
        />
        <meta
          property="og:image"
          content="https://media.giphy.com/media/Rsp9jLIy0VZOKlZziw/giphy.gif"
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Navbar />
      <Box userSelect="none">
        <Transition>{children}</Transition>
      </Box>
      <Footer />
    </>
  );
};
