import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";

const HomeScreen = ({ searchParams, products, productTypes }) => {
    // Pastikan products.data ada dan memiliki data
    const productsData = products?.data || []; // Fallback ke array kosong jika tidak ada data

    return (
        <div className="my-10">
            <h1 className="text-3xl font-semibold">Products</h1>
            <div className="my-5 grid grid-cols-4 gap-5">
                <FilterSection 
                    searchParams={searchParams}
                    productTypes={productTypes}
                />

                <div className="col-span-3 grid grid-cols-2 gap-5">
                    {
                        productsData.length > 0 ? (
                            productsData.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="flex justify-center items-center col-span-2">
                                <span className="text-xl font-medium">
                                    Products Not Found.
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;
