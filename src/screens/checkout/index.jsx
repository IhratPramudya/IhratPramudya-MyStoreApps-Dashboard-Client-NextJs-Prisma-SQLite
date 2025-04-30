"use client"

import { createCheckoutSession } from "@/actions/stripeActions";
import { useProductContext } from "@/components/Layout/ProductContext";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Checkout = () => {
    const router = useRouter();
    const [StripePromise, setStripePromise] = useState(null);
    const [options, setOptions] = useState(null);
    const {cartItems, customerData} = useProductContext()

    useEffect(() => {
        // Memuat Stripe hanya sekali saat komponen dimuat
        setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
    }, []); // Array dependensi kosong agar hanya dijalankan sekali saat pertama kali render

    useEffect(() => {
        const fetchClientSecret = async () => {
            const session = await createCheckoutSession(cartItems, customerData);
            setOptions({ clientSecret: session.clientSecret });
        };

        
        if(cartItems.length === 0 || !customerData?.id){
            router.push("/")
        } else {
            fetchClientSecret(); // Memanggil fungsi untuk mendapatkan clientSecret
        }
    }, []); // Hanya dipanggil sekali saat komponen pertama kali dirender

    return (
        <div>
            {options?.clientSecret && StripePromise && (  // Memastikan StripePromise dan clientSecret ada
                <EmbeddedCheckoutProvider stripe={StripePromise} options={options}>
                    <div className="my-10">
                        <EmbeddedCheckout />
                    </div>
                </EmbeddedCheckoutProvider>
            )}
        </div>
    );
}

export default Checkout;
