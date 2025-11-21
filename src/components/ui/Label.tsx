

import { cn } from "@/lib/utils";

interface LabelProps {
    className?: string;
    children: any;
    id: string;
}


export function Label({ className, children, id }: LabelProps) {
    return (
        <>
            <label htmlFor={id} className={cn("block text-sm font-bold text-gray-700", className)}>{children}</label>
        </>
    )
}