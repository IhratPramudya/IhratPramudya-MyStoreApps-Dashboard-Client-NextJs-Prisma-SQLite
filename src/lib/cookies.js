import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export async function setCookie(name, value, options={}) {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
        ...options
    }
    const cookie = await cookies()
    cookie.set(name, value, cookieOptions)
    redirect("/")
}

export async function getCookie(name) {
    const cookie = await cookies()
    return cookie?.get(name).value || null;
}
