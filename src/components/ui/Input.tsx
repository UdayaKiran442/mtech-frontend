
import { cn } from "@/lib/utils";

interface IInputProps {
    className?: string;
    placeholder: string;
    required: boolean;
    name: string;
    id: string;
    type: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export function Input({ className, placeholder, name, id, type, value, required, onChange }: IInputProps) {
    return (
        <>
            <input
                className={cn("w-full px-4 py-2 border border-gray-300 rounded-md focus:border-transparent transition focus:outline-none", className)}
                type={type}
                placeholder={placeholder}
                name={name}
                id={id}
                required={required}
                value={value}
                onChange={onChange}
            />
        </>
    )
}