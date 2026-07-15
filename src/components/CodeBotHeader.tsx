"use client";

import { SquareTerminal } from "lucide-react";
import { H6 } from "./ui/Typography";

export function CodeBotHeader() {
    return (
        <div className="flex flex-col items-center mt-10 gap-4 ">
            <SquareTerminal className="text-icon_primary" size={48} />
            <H6 className="text-white">Cook with Codebot</H6>
            <p className="text-text text-sm">Query your codebase by selecting repository and branch</p>
        </div>
    )
}