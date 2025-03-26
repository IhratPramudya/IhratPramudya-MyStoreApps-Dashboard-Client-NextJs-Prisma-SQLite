"use client";

import Accordion from "@/components/ui/Accordion";
import PriceRangeSlider from "@/components/ui/PriceRangeSlider";
import { objectToQueryString } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    const searchParams = useSearchParams();
    const accordion = searchParams.get("openAccordion");



    const router = useRouter();
    const openAccordion = accordion ? accordion.split(",") : [];

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("minData", "0")
            localStorage.setItem("maxData", "100")
            const savedMin = localStorage.getItem("minData")
            const savedMax = localStorage.getItem("maxData")

            setMinValue(savedMin ? Number(savedMin) : "0");
            setMaxValue(savedMax ? Number(savedMax) : "100");
        }
    }, [])

    
    const updateSearchParams = (newParamsArray) => {
        // Gabungkan array objek menjadi satu objek
        const updatedParams = Object.assign({}, ...newParamsArray);
    
        // Hapus parameter jika nilainya null atau kosong
        Object.keys(updatedParams).forEach((key) => {
            if (updatedParams[key] === null || updatedParams[key] === "") {
               delete updatedParams[key];
            }
        });
    
        console.log("Updated Search Params:", updatedParams);
        if(updatedParams["openAccordion"] == "priceRange") {
           
            const params = new URLSearchParams(searchParams.toString());
            params.set("minPrice", localStorage.getItem("minData"));
            params.set("maxPrice", localStorage.getItem("maxData"));
            params.set("openAccordion", "priceRange");
            router.push(`?${params.toString()}`, { scroll: false });
        }
        
        router.push(`/?${objectToQueryString(updatedParams)}`, { scroll: false });
    };
    
    const handleAccordion = (value) => {
        const newOpenAccordion = openAccordion.includes(value)
            ? openAccordion.filter((item) => item !== value)
            : [...openAccordion, value];
    
        console.log(newOpenAccordion);
    
        updateSearchParams(newOpenAccordion.length > 0 
            ? [{ openAccordion: newOpenAccordion.join(",") }] 
            : [{ openAccordion: null }]
        );
    };


    
    

    const updateUrl = (value) => {
        const params = new URLSearchParams(searchParams.toString());
        localStorage.setItem("minData", value[0])
        localStorage.setItem("maxData", value[1])
        setMinValue(value[0]);
        setMaxValue(value[1]);
        params.set("minPrice", value[0]);
        params.set("maxPrice", value[1]);
        params.set("openAccordion", "priceRange");
        router.push(`?${params.toString()}`, { scroll: false });
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
                            value={[minValue, maxValue]}
                            handleChange={updateUrl}
                            />
                </div>
                <div className="flex justify-between mt-2">
                    <span>${minValue}</span>
                    <span>${maxValue}</span>
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