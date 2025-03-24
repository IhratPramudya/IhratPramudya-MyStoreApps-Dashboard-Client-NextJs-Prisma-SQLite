"use client"

import { ChevronDownIcon } from "@/components/icons";
import Accordion from "@/components/ui/Accordion";
import PriceRangeSlider from "@/components/ui/PriceRangeSlider";
import { cn, objectToQueryString } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const FilterSection = () => {
    const CategoryItems = [
        {label:"All", value:"all"},
        {label:"Kid's Clothing", value:"Kid's Clothing"},
        {label:"Men's Cllothing", value:"Men's Clothing"}
    ]

    const SortByItems = [
        {label: "All", value: "all"},
        {label: "Price high to low", value: "Men's Clothing"},
        {label: "Price low to high", value: "lowToHigh"}
    ];

    const RatingItems = [
        {label: "All", value: "all"},
        {label: "1", value: "1"},
        {label: "2", value: "2"},
        {label: "3", value: "3"},
        {label: "4", value: "4"},
        {label: "5", value: "5"},
    ];

    const AvailabilityItems = [
        {label: "All", value: "all"},
        {label: "In Stock", value: "true"},
        {label: "Out of Stock", value: "false"}
    ]

    const router = useRouter()
    const searchParams = useSearchParams()
    const accordion = searchParams.get("openAccordion")
    const openAccordion = accordion?.split(",") || [];

    const updateSearchParams = (newParamsArray) => {
        const updateSearchParams = {...newParamsArray};
        console.log("NewParamsArray : ", newParamsArray);
        newParamsArray?.forEach((params) => {
            Object.entries(params).forEach(([key, value])=> {
                if(value === null || value==="") {
                    delete updateSearchParams[key];
                } else {
                    updateSearchParams[key] = value
                }
            })
        });
        console.log("After updatedSearchParams : ", updateSearchParams)  
        router.push(`/?${objectToQueryString(updateSearchParams)}`)
    }

    const handleAccordion = (value) => {
        const newOpenAccordion = openAccordion.includes(value) ? openAccordion.filter((item) => item!==value)
            : [...openAccordion, value]
            console.log(newOpenAccordion)
        updateSearchParams([{openAccordion: newOpenAccordion.join(",")}])
    }

    const minPrice = searchParams.get("minPrice") || "0";
    const maxPrice = searchParams.get("maxPrice") || "100";

  
    const handlePriceRangeChange = (value) => {
        console.log(value)
        updateSearchParams([{minPrice:value[0]}, {maxPrice:value[1]}])
    }

    
    return (
        <div className="rounded-lg shadow-lg space-y-3 p-5 bg-white h-fit">
            <h1 className="text-2xl mb-8 font-semibold">Filters</h1>
            <Accordion
                title="Category"
                isOpened={openAccordion.includes("productTypeId")}
                type="productTypeId"
                handleAccordion={handleAccordion}
            >
                <div className="flex flex-wrap gap-3 pt-2">
                        {
                            CategoryItems.map((item, index) => (
                                <div key={index} className="mt-2">
                                    <input type="checkbox" 
                                        id={`productType-${item.value}`} 
                                        className="hidden peer" />
                                    <label 
                                        htmlFor={`productType-${item.value}`} 
                                        className="checkboc-button-label">
                                        {item.label}
                                    </label>
                                </div>
                            ))
                        }
                </div>
            </Accordion>
            <Accordion
                title="Price Range"
                isOpened={openAccordion.includes("priceRange")}
                type="priceRange"
                handleAccordion={handleAccordion}>
                <div className="p-3">
                        <PriceRangeSlider 
                            minValue={0} 
                            maxValue={100} 
                            value={[minPrice, maxPrice]}
                            handleChange={handlePriceRangeChange}
                            />
                </div>
            </Accordion>
            <Accordion
                title="Sort by"
                isOpened={openAccordion.includes("sortBy")}
                type="sortBy"
                handleAccordion={handleAccordion}
            >
                <div className="flex flex-wrap gap-3 pt-2">
                        {
                            SortByItems.map((item, index) => (
                                <div key={index} className="mt-2">
                                    <input type="checkbox" 
                                        id={`sortBy-${item.value}`} 
                                        className="hidden peer" />
                                    <label 
                                        htmlFor={`sortBy-${item.value}`} 
                                        className="checkboc-button-label">
                                        {item.label}
                                    </label>
                                </div>
                            ))
                        }
                </div>
            </Accordion>
            <Accordion
                title="Rating"
                isOpened={openAccordion.includes("rating")}
                type="rating"
                handleAccordion={handleAccordion}
            >
                <div className="flex flex-wrap gap-3 pt-2">
                        {
                            RatingItems.map((item, index) => (
                                <div key={index} className="mt-2">
                                    <input type="checkbox" 
                                        id={`rating-${item.value}`} 
                                        className="hidden peer" />
                                    <label 
                                        htmlFor={`rating-${item.value}`} 
                                        className="checkboc-button-label">
                                        {item.label}
                                    </label>
                                </div>
                            ))
                        }
                </div>
            </Accordion>
            <Accordion
                title="Availability"
                isOpened={openAccordion.includes("inStock")}
                type="inStock"
                handleAccordion={handleAccordion}
            >
                <div className="flex flex-wrap gap-3 pt-2">
                        {
                            AvailabilityItems.map((item, index) => (
                                <div key={index} className="mt-2">
                                    <input type="checkbox" 
                                        id={`availability-${item.value}`} 
                                        className="hidden peer" />
                                    <label 
                                        htmlFor={`availability-${item.value}`} 
                                        className="checkboc-button-label">
                                        {item.label}
                                    </label>
                                </div>
                            ))
                        }
                </div>
            </Accordion>
        </div>
    )
}

export default FilterSection;