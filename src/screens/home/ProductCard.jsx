import { StarIcon } from "@/components/icons";
import Image from "next/image";

const ProductCard = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg w-full min-h-[624px]">
            <Image
                className="w-full h-full rounded-t-xl max-h-96"
                src="/next.svg"
                alt="product"
                width={0}
                height={0}
                sizes="100vh"
            />
            <div className="p-5 space-y-4">
                <div className="space-y-1">
                    <span className="text-2xl font-semibold leading-5">Product Name</span>
                    <p className="text-gray-400 text-md truncate" >This is the product description</p>
                </div>

                <div className="flex justify-between items-center ">
                    <div className="flex gap-x-3 items-center text-xl font-semibold">
                        <span className="text-gray-500 line-through">$19.99</span>
                        <span className="text-2xl">$16.99</span>
                    </div>
                    <span className="text-gray-400">12 left</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-x-1">
                        {
                            [...Array(5)].map((star) => (
                                <StarIcon key={star} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
