"use client"

import { IWorkspaceDocument } from "@/types/types"
import { DocumentsList } from "../DocumentsList"
import { DocumentsView } from "../DocumentView"

type IKnowledgeBaseProps = {
    workspaceDocuments: IWorkspaceDocument[]
}

export function KnowledgeBase({workspaceDocuments}: IKnowledgeBaseProps) {
    return (
        <div className="flex w-full h-full">
            <div className="w-[50%]">
                <DocumentsList workspaceDocuments={workspaceDocuments} />
            </div>
            <div className="w-[50%] h-full">
                <DocumentsView />
            </div>
        </div>
    )
}