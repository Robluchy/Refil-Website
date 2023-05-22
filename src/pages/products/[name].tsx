import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ProductList } from "@/interfaces";
import { getProducts, getProductByName } from "@/firebase/utils/getProducts";
import ProductDetails from "@/components/products/ProductDetails";
import { Layout } from "@/components/Layout";

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProducts();
  const paths = products.map((product) => ({
    params: { name: product.name },
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) {
    return { notFound: true };
  }

  const productName = context.params.name as string;
  const product = await getProductByName(productName);

  return { props: { product } };
};

interface ProductPageProps {
  product: ProductList;
}

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={product.name}>
      <ProductDetails pro={product} />
    </Layout>
  );
}
