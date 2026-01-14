"use client"

import { IWorkspaceView } from "@/types/types"
import { useState } from "react"
import { Chat } from "./workspace-views/Chat"
import { Chatbot } from "./workspace-views/Chatbot"
import { KnowledgeBase } from "./workspace-views/KnowledgeBase"
import { ChatCode } from "./workspace-views/ChatCode"
import { WorkspaceLayout } from "./WorkspaceLayout"

export default function WorkspaceComponent() {
    const [view, setView] = useState<IWorkspaceView>("chat")
    return (
        <div className="flex gap-4">
            <div>
                <WorkspaceLayout />
            </div>
            <div className="p-4">
                {view === 'chat' && <Chat />}
                {view === 'ai_chatbot' && <Chatbot />}
                {view === 'knowledge_base' && <KnowledgeBase />}
                {view === 'code_chat' && <ChatCode />}
            </div>
        </div>
    )
}