"use client"

import { IActiveWorkspace, IUserWorkspacesResponse, IWorkspaceView } from "@/types/types"
import { useState } from "react"
import { Chat } from "./workspace-views/Chat"
import { Chatbot } from "./workspace-views/Chatbot"
import { KnowledgeBase } from "./workspace-views/KnowledgeBase"
import { ChatCode } from "./workspace-views/ChatCode"
import { WorkspaceLayout } from "./WorkspaceLayout"

type IWorkspaceComponentProps = {
    workspaces: IUserWorkspacesResponse['workspaces'],
    activeWorkspace: IActiveWorkspace
}

export default function WorkspaceComponent({workspaces, activeWorkspace}: IWorkspaceComponentProps) {
    const [view, setView] = useState<IWorkspaceView>("Channels")
    return (
        <div className="flex gap-4">
            <div>
                <WorkspaceLayout activeWorkspace={activeWorkspace} workspaces={workspaces} view={view} setView={setView} />
            </div>
            <div className="p-4">
                {view === 'Channels' && <Chat />}
                {view === 'AI Assistant' && <Chatbot />}
                {view === 'Knowledge Base' && <KnowledgeBase />}
                {view === 'Code Chat' && <ChatCode />}
            </div>
        </div>
    )
}