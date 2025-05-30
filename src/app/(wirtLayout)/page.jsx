import { getProducts, getProductTypes } from "@/actions/productActions";
import HomeScreen from "@/screens/home";

export default async function Home({ searchParams  }) {
  const products = await getProducts(searchParams);
  const producTypesRes = await getProductTypes();
  console.log(producTypesRes)
  const productTypes = [
    {label: "All", value: "all"},
    ...producTypesRes?.data?.map((item) => ({
      label: item.name,
      value: item.id
    }))
  ]

  return (
    <HomeScreen searchParams={ searchParams } products={products} productTypes={productTypes}/>
  );
}
