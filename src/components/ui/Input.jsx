import { cn } from "@/lib/utils"


export default function Input({type, className, ...props}) {
    return (
        <input 
            type={type}
            placeholder="Search Product ..."
            className={cn("custom-input", className)}
            {...props}
        />
    )
}