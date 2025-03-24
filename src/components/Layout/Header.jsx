"use client";

import { useState, useRef, useEffect } from "react";
import { CartIcon, SearchIcon, UserIcon } from "../icons";
import Link from "next/link";
import Input from "../ui/Input";


const Header = () => {

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

    return (
        <div className="navbar">
            <div className="container">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-semibold">MyStore</h1>
                    <div className="relative w-full max-w-lg">
                        <SearchIcon className="absolute left-2 top-2 w-7 h-7"/>
                        <Input 
                            placeholder="Search Product..."
                            className="pl-10"
                        />
                    </div>
                    <div className="relative" ref={dropDownRef}>
                        <div className="flex gap-3">
                            <CartIcon className="w-7 h-7"/>
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
