"use client"
import { Dispatch, SetStateAction, useState } from 'react'
import { BookOpen, BotMessageSquare, ChevronDown, ChevronUp, MessageSquare, Workflow } from 'lucide-react'
import { SideBarNavigation } from './ui/SideBarNavigation'
import { IWorkspaceView } from '@/types/types'

const iconStyle = "mt-1 text-gray-500"

type IWorkspaceLayoutProps = {
    view: IWorkspaceView,
    setView: Dispatch<SetStateAction<IWorkspaceView>>
}

export function WorkspaceLayout({view, setView}: IWorkspaceLayoutProps) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <div className="bg-[#FAFAFA] w-64 h-screen p-4 border-r-2 border-gray-200">
                {/* Workspace selection */}
                <div>
                   <div className='flex gap-1 items-center cursor-pointer' onClick={() => setIsOpen(!isOpen)}  >
                     <p className="font-medium ">Workspace Name</p>
                     {isOpen ? <ChevronUp className={iconStyle} /> : <ChevronDown className={iconStyle} />}
                   </div>
                    {isOpen && (
                        <div className=" bg-white border rounded shadow-lg w-48">
                            <div className="p-2 hover:bg-gray-100 cursor-pointer">Workspace 1</div>
                            <div className="p-2 hover:bg-gray-100 cursor-pointer">Workspace 2</div>
                            <div className="p-2 hover:bg-gray-100 cursor-pointer">Workspace 3</div>
                        </div>
                    )}
                </div>
                {/* Navigation */}
                <div>
                    <div onClick={() => setView("Channels")}>
                        <SideBarNavigation view={view} label='Channels'>
                            <MessageSquare size={18} className={`${iconStyle} ${view === 'Channels' ? "text-white" : ""}`} />
                        </SideBarNavigation>
                    </div>
                    <div onClick={() => setView("Knowledge Base")}>
                        <SideBarNavigation view={view} label='Knowledge Base'>
                            <BookOpen size={18} className={`${iconStyle} ${view === 'Knowledge Base' ? "text-white" : ""}`} />
                        </SideBarNavigation>
                    </div>
                    <div onClick={() => setView("AI Assistant")}>
                        <SideBarNavigation view={view} label='AI Assistant'>
                            <BotMessageSquare size={18} className={`${iconStyle} ${view === 'AI Assistant' ? "text-white" : ""}`} />
                        </SideBarNavigation>
                    </div>
                    <div onClick={() => setView("Code Chat")}>
                        <SideBarNavigation view={view} label='Code Chat'>
                            <Workflow size={18} className={`${iconStyle} ${view === 'Code Chat' ? "text-white" : ""}`} />
                        </SideBarNavigation> 
                    </div>
                </div>
            </div>
        </div>
    )
}