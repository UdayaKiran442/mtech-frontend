import React, { HTMLProps } from "react";
import { cn } from "@/lib/utils";

interface ITypegraphyProps {
    children: React.ReactNode;
    className?: HTMLProps<HTMLElement>["className"]; // The className prop is just a string
}

export function H3({ children, className }: ITypegraphyProps) {
    return (
        <h3 className={cn("text-3xl! font-bold", className)}>{children}</h3>
    )
}

export function H4({ children, className }: ITypegraphyProps) {
    return (
        <h4 className={cn("text-2xl! font-bold", className)}>{children}</h4>
    )
}

export function H6({ children, className }: ITypegraphyProps) {
    return (
        <h6 className={cn("text-lg! font-bold", className)}>{children}</h6>
    )
}

export function Tagline({ children, className }: ITypegraphyProps) {
    return <p className={cn("text-gray-600", className)}>{children}</p>;
}