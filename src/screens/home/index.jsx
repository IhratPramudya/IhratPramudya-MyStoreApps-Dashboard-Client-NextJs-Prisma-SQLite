import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";

const HomeScreen = () => {
    return (
        <div className="my-10">
            <h1 className="text-3xl font-semibold">Products</h1>
            <div className="my-5 grid grid-cols-4 gap-5">
                <FilterSection/>
                <div className="col-span-3 grid grid-cols-2 gap-5"  >
                    <ProductCard />
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;
