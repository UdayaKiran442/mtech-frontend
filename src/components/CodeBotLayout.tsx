"use client";

import { SquareTerminal } from "lucide-react";

export function CodeBotLayoutComponent(){
    return (
        <div>
            <div className="flex justify-between w-full">
                <p className="text-text text-sm">Chats</p>
                <p className="text-text text-sm">+ New</p>
            </div>
            <div>
                <div className="flex gap-2 items-center mt-4 p-2 cursor-pointer bg-bg_secondary">
                    <SquareTerminal className="text-icon_primary" size={14} />
                    <p className="font-semibold text-sm text-white">Codebot Session 1</p>
                </div>
            </div>
        </div>
    )
}