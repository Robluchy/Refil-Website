import { GetStaticProps, NextPage } from "next";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductList } from "@/interfaces/productList";
import { getProducts } from "@/firebase/utils/getProducts";
import { Layout } from "@/components/Layout";
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

export default function Store({ products }: Props) {
  return (
    <Layout title={"Store"}>
      <ProductCard pro={products} />
    </Layout>
  );
}
