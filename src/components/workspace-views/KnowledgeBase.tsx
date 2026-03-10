"use client"

import { DocumentsList } from "../DocumentsList"
import { DocumentsView } from "../DocumentView"

export function KnowledgeBase() {
    return (
        <div className="flex w-full h-full">
            <div className="w-[50%]">
                <DocumentsList />
            </div>
            <div className="w-[50%] h-full">
                <DocumentsView />
            </div>
        </div>
    )
}