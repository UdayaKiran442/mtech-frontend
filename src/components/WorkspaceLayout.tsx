"use client"
import { Dispatch, SetStateAction, useState } from 'react'
import { BookOpen, BotMessageSquare, ChevronDown, ChevronUp, MessageSquare, Workflow } from 'lucide-react'
import { SideBarNavigation } from './ui/SideBarNavigation'
import { IActiveWorkspace, IUserWorkspacesResponse, IWorkspaceView } from '@/types/types'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const iconStyle = "mt-0.5 text-[#929292] "

type IWorkspaceLayoutProps = {
    view?: IWorkspaceView,
    workspaces: IUserWorkspacesResponse['workspaces'],
    activeWorkspace: IActiveWorkspace,
    setView?: Dispatch<SetStateAction<IWorkspaceView>>
}

export function WorkspaceLayout({workspaces, activeWorkspace}: IWorkspaceLayoutProps) {
    const [isOpen, setIsOpen] = useState(false)
    // active navigation from url path - either chat or code chat
    const url = usePathname();
    const path = url.split(`/workspace/${activeWorkspace.workspaceId}/`)[1]
    const getActiveViewFromUrl = (): IWorkspaceView => {
        if (path === "chat") return "Chat"
        if (path === "knowledge-base") return "Knowledge Base"
        if (path === "ai-assistant") return "AI Assistant"
        if (path === "code-chat") return "Codebot"
        return "Chat"
    }
    const view = getActiveViewFromUrl();
    return (
        <div>
            <div className="bg-bg_primary w-full h-screen p-4 ">
                {/* Workspace selection */}
                <div>
                   <div className='flex gap-1 items-center w-fit cursor-pointer' onClick={() => setIsOpen(!isOpen)}  >
                     <p className="font-medium text-sm text-text">{activeWorkspace.workspaceName}</p>
                     {isOpen ? <ChevronUp className={iconStyle} size={18} /> : <ChevronDown className={iconStyle} size={18} />}
                   </div>
                    {isOpen && (
                        workspaces.length > 0 && workspaces.map((ws) => (
                            <div key={ws.workspaceId} className=" bg-bg_primary border rounded shadow-lg w-48">
                                <div className={`p-2 hover:bg-bg_secondary cursor-pointer ${ws.workspaceId === activeWorkspace.workspaceId ? "bg-bg_secondary" : ""}`}>
                                    <p className="text-text text-sm">{ws.workspaceName}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* Navigation */}
                <div>
                    <div>
                        {/* <Link href={`/workspace/${activeWorkspace.workspaceId}/chat`}>
                            <SideBarNavigation view={view} label='Chat'>
                                <MessageSquare className='text-icon_primary' size={14} />
                            </SideBarNavigation>
                        </Link> */}
                    </div>
                    <div>
                        <Link href={`/workspace/${activeWorkspace.workspaceId}/knowledge-base`}>
                            <SideBarNavigation view={view} label='Knowledge Base'>
                                <BookOpen className='text-icon_primary' size={14} />
                            </SideBarNavigation>
                        </Link>
                    </div>
                    <div>
                        {/* <Link href={`/workspace/${activeWorkspace.workspaceId}/ai-assistant`}>
                            <SideBarNavigation view={view} label='AI Assistant'>
                                <BotMessageSquare className='text-icon_primary' size={14} />
                            </SideBarNavigation>
                        </Link> */}
                    </div>
                    <div >
                        <Link href={`/workspace/${activeWorkspace.workspaceId}/code-chat`}>
                            <SideBarNavigation view={view} label='Codebot'>
                                <Workflow className='text-icon_primary' size={14} />
                            </SideBarNavigation>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}