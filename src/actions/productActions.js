"use server"

import { objectToQueryString } from "@/lib/utils";

export async function getProducts(searchParams) {
        const filteredParams = {...searchParams};
        delete filteredParams.openAccordion
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${BASE_URL}/api/products?${objectToQueryString(filteredParams)}`);
        const data = await res.json()

        return data;
}

export async function getProductTypes() {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${BASE_URL}/api/products/product-type`);
        const data = await res.json();
        
        return data;
}

export async function getProductById(productId) {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${BASE_URL}/api/products/${productId}`);
        const data = await res.json();


        return data;
}