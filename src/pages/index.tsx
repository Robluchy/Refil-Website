import Features from "@/components/Home/Feature/Features";
import Intro from "@/components/Home/Intro";
import Hero from "@/components/Home/Hero";
import Statistics from "@/components/Home/Statistics";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { useAuth } from "@/firebase/context/AuthContext";
import { Spinner, Center } from "@chakra-ui/react";
import ProuctPreview from "@/components/Home/ProuctPreview";
import { ProductList } from "@/interfaces";
import { GetStaticProps } from "next";
import { getProducts } from "@/firebase/utils/getProducts";
interface Props {
  products: ProductList[];
}
export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: 60,
  };
};

export default function Home({ products }: Props) {
  const { user } = useAuth();
  const [showIntro, setShowIntro] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 4800);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <>
      {!user && showIntro ? (
        <Intro />
      ) : (
        <Layout title="REFIL">
          <Hero />
          <Features />
          <ProuctPreview products={products.slice(0, 3)} />
          <Statistics />
        </Layout>
      )}
    </>
  );
}
