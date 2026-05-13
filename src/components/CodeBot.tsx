"use client";

import { SquareTerminal } from "lucide-react";
import { H6 } from "./ui/Typography";

export function Codebot() {
    return (
        <div className="bg-bg_primary h-screen w-full ">
            <div className="flex ">
                {/* 1st column, chat history and new chat button */}
                <div className="w-[20%] p-5 border-r border-b border-border_primary h-screen">
                    <div className="flex justify-between">
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
                {/* 2nd column, input box, send button, repo and branch selection */}
                <div className="w-3/4 h-screen">
                    
                </div>
            </div>
        </div>
    )
}