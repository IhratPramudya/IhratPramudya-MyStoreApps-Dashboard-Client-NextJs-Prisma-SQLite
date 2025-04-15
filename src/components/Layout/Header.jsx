"use client";

import { useState, useRef, useEffect } from "react";
import { CartIcon, SearchIcon, UserIcon } from "../icons";
import Link from "next/link";
import Input from "../ui/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { objectToQueryString } from "@/lib/utils";
import { useProductContext } from "./ProductContext";


const Header = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";

    const existingSearchParams = {
        productTypeId: searchParams.get("productTypeId"),
        sortBy: searchParams.get("sortBy"),
        minPrice: searchParams.get("minPrice" || 0),
        maxPrice: searchParams.get("maxPrice" || 100),
        rating: searchParams.get("rating"),
        inStock: searchParams.get("inStock"),
        openAccordion: searchParams.get("openAccordion")
    }

    const router = useRouter();
    const openAccordion = searchParams.openAccordion?.split(",") || [];

    const updateSearchParams = (newParamsArray) => {
        const updatedSearchParams = {...existingSearchParams, search: search}

        newParamsArray?.forEach((param) => {
            Object.entries(param).forEach(([key, value]) => {
                if (value === null || value === "" || value==="all") {
                    delete updatedSearchParams[key];
                } else {
                    updatedSearchParams[key] = value;
                }
            })
        })

        router.push(`/?${objectToQueryString(updatedSearchParams)}`);
    };

    const handleFilterChange = (filterType, value) => {
        updateSearchParams([{
            [filterType]: value
        }])
    }


    const [dropDownOpen, setDropDownOpen] = useState(false);
    const dropDownRef = useRef(null)
    const toggleDropDown = () => {
        setDropDownOpen(!dropDownOpen);
    }

    const handleClickOutside = (event) => {
        if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
            setDropDownOpen(false)
        }
    }

    useEffect(() => {
        if(dropDownOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropDownOpen])

    const {cartItems} = useProductContext()

    return (
        <div className="navbar">
            <div className="container">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <h1 className="text-3xl font-semibold">MyStore</h1>
                    </Link>
                    <div className="relative w-full max-w-lg">
                        <SearchIcon className="absolute left-2 top-2 w-7 h-7"/>
                        <Input 
                            placeholder="Search Product..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => handleFilterChange("search", e.target.value)}
                        />
                    </div>
                    <div className="relative" ref={dropDownRef}>
                        <div className="flex gap-3">
                            <Link href="/cart">     
                                <div className="relative">
                                    <div 
                                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex justify-center items-center font-semibold">
                                        {cartItems.length}
                                    </div>
                                    <CartIcon className="w-7 h-7"/>
                                </div>          
                            </Link>
                            <button className="icon-button" onClick={toggleDropDown}>
                                <UserIcon className="w-7 h-7"/>
                            </button>
                        </div>
                        {
                            dropDownOpen &&
                            <div className="dropdown-menu">
                                <Link 
                                    href="/"
                                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                                    >My Wishlist</Link>
                                <button
                                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 w-full text-left"
                                >Logout</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
