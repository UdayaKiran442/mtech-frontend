"use client"

import { IWorkspaceView } from "@/types/types"
import { useState } from "react"
import { Chat } from "./workspace-views/Chat"
import { Chatbot } from "./workspace-views/Chatbot"
import { KnowledgeBase } from "./workspace-views/KnowledgeBase"
import { ChatCode } from "./workspace-views/ChatCode"
import { WorkspaceLayout } from "./WorkspaceLayout"

export default function WorkspaceComponent() {
    const [view, setView] = useState<IWorkspaceView>("Channels")
    return (
        <div className="flex gap-4">
            <div>
                <WorkspaceLayout view={view} setView={setView} />
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