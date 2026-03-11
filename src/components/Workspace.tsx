"use client"

import { IActiveWorkspace, IUserWorkspacesResponse, IWorkspaceDocument, IWorkspaceMember, IWorkspaceView } from "@/types/types"
import { useState } from "react"
import { Chat } from "./workspace-views/Chat"
import { Chatbot } from "./workspace-views/Chatbot"
import { KnowledgeBase } from "./workspace-views/KnowledgeBase"
import { ChatCode } from "./workspace-views/ChatCode"
import { WorkspaceLayout } from "./WorkspaceLayout"

type IWorkspaceComponentProps = {
    workspaces: IUserWorkspacesResponse['workspaces'],
    activeWorkspace: IActiveWorkspace,
    workspaceDocuments: IWorkspaceDocument[],
    workspaceMembers: IWorkspaceMember[]
}

export default function WorkspaceComponent({workspaces, activeWorkspace, workspaceDocuments, workspaceMembers}: IWorkspaceComponentProps) {
    const [view, setView] = useState<IWorkspaceView>("Channels")
    return (
        <div className="flex w-full">
            <div className="w-1/4">
                <WorkspaceLayout activeWorkspace={activeWorkspace} workspaces={workspaces} view={view} setView={setView} />
            </div>
            <div className="p-4 w-3/4">
                {view === 'Channels' && <Chat workspaceMembers={ workspaceMembers } />}
                {view === 'AI Assistant' && <Chatbot />}
                {view === 'Knowledge Base' && <KnowledgeBase workspaceDocuments={workspaceDocuments} />}
                {view === 'Code Chat' && <ChatCode />}
            </div>
        </div>
    )
}