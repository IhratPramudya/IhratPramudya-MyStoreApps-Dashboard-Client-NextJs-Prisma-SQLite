import { loginUser } from "@/actions/authActions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Link from "next/link";

const Login = async ({searchParams}) => {
    const {errorMessage} = await searchParams;
    return (
        <div className="h-screen bg-gray-100 flex justify-center items-center">
            <div className="w-full max-w-xl rounded-xl shadow p-10 border border-gray-100 bg-white">
                <h1 className="text-4xl font-medium text-center mb-7">Login</h1>
                <form className="grid gap-6" action={loginUser}>
                    {
                        errorMessage && (
                            <div className="col-span-2 border border-red-500 rounded-xl px-5 py-3 bg-red-50 w-fit">
                                <span
                                    className="text-red-500 col-span-2 text-md my-0"
                                >{errorMessage}</span>
                            </div>
                        )        
                    }
                    <div className="grid gap-2">
                        <Label required>Email</Label>
                        <Input
                            type="text"
                            placeholder="Enter your Email"
                            name="email"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label required>Password</Label>
                        <Input
                            type="password"
                            minLength={8}
                            placeholder="Enter your Password"
                            name="password"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-blue-700">
                        Submit
                    </Button>
                    <div>
                        <span>
                            Don't have an account? 
                            <Link href="/sign-up" className="text-blue-700 font-semibold mx-1 hover:underline">
                                Sign Up
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
