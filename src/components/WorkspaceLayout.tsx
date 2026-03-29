"use client"
import { Dispatch, SetStateAction, useState } from 'react'
import { BookOpen, BotMessageSquare, ChevronDown, ChevronUp, MessageSquare, Workflow } from 'lucide-react'
import { SideBarNavigation } from './ui/SideBarNavigation'
import { IActiveWorkspace, IUserWorkspacesResponse, IWorkspaceView } from '@/types/types'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const iconStyle = "mt-1 text-gray-500"

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
    const getActiveViewFromUrl = (): IWorkspaceView => {
        if (url.includes("chat")) return "Chat"
        if (url.includes("knowledge-base")) return "Knowledge Base"
        if (url.includes("ai-assistant")) return "AI Assistant"
        if (url.includes("code-chat")) return "Code Chat"
        return "Chat"
    }
    const view = getActiveViewFromUrl();
    return (
        <div>
            <div className="bg-[#FAFAFA] w-full h-screen p-4 border-r-2 border-gray-200">
                {/* Workspace selection */}
                <div>
                   <div className='flex gap-1 items-center cursor-pointer' onClick={() => setIsOpen(!isOpen)}  >
                     <p className="font-medium ">{activeWorkspace.workspaceName}</p>
                     {isOpen ? <ChevronUp className={iconStyle} /> : <ChevronDown className={iconStyle} />}
                   </div>
                    {isOpen && (
                        workspaces.length > 0 && workspaces.map((ws) => (
                            <div key={ws.workspaceId} className=" bg-white border rounded shadow-lg w-48">
                                <div className={`p-2 hover:bg-gray-100 cursor-pointer ${ws.workspaceId === activeWorkspace.workspaceId ? "bg-gray-200" : ""}`}>{ws.workspaceName}</div>
                            </div>
                        ))
                    )}
                </div>
                {/* Navigation */}
                <div>
                    <div>
                        <Link href={`/workspace/${activeWorkspace.workspaceId}/chat`}>
                            <SideBarNavigation view={view} label='Chat'>
                                <MessageSquare size={18} />
                            </SideBarNavigation>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/workspace/${activeWorkspace.workspaceId}/knowledge-base`}>
                            <SideBarNavigation view={view} label='Knowledge Base'>
                                <BookOpen size={18} />
                            </SideBarNavigation>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/workspace/${activeWorkspace.workspaceId}/ai-assistant`}>
                            <SideBarNavigation view={view} label='AI Assistant'>
                                <BotMessageSquare size={18} />
                            </SideBarNavigation>
                        </Link>
                    </div>
                    <div >
                        <Link href={`/workspace/${activeWorkspace.workspaceId}/code-chat`}>
                            <SideBarNavigation view={view} label='Code Chat'>
                                <Workflow size={18} />
                            </SideBarNavigation>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}