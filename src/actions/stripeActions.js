"use server";

import Stripe from "stripe";

const SIZES = {
    smallSize: "S",
    mediumSize: "M",
    largeSize: "L"
}

export async function createCheckoutSession(products, customerData) {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const checkoutSession = await stripeInstance.checkout.sessions.create({
        ui_mode: "embedded",  // Pastikan ini sesuai dengan kebutuhan Anda (Stripe sudah tidak menggunakan ui_mode)
        invoice_creation: {
            enabled: true,
        },
        customer_email: "test@gmail.com",
        submit_type: "pay",
        billing_address_collection: "auto",
        shipping_address_collection: {
            allowed_countries: ["US", "CA", "ID"]
        },
        line_items: products?.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: `${product.name} (Size:${SIZES[product.sizes]})`,  // Harus berupa objek dengan properti seperti 'name'
                    description: "A comfortable cotton t-shirt"  // Deskripsi produk
                },
                unit_amount: parseInt(product.sellPrice*100),  // Nilai dalam sen (1 USD = 100 sen)
            },
            quantity: product.quantity,
        })),
        mode: "payment",
        metadata: {
            products: JSON.stringify(
                products.map((product) => ({
                    id: product.id,
                    name: product.name,
                    quantity: product.quantity,
                    sellPrice: product.sellPrice,
                    size: product.size
                }))
            ),
            customerId: customerData?.id
        },
        return_url: `http://localhost:3000/payment-status?session_id={CHECKOUT_SESSION_ID}` // Gunakan placeholder yang benar
    });

    return {
        clientSecret: checkoutSession.client_secret
    };
}


export async function getCheckoutSession(session_id) {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripeInstance.checkout.sessions.retrieve(session_id)
    return session;
}