"use client"
import { useState } from 'react'
import { BookOpen, BotMessageSquare, ChevronDown, ChevronUp, MessageSquare, Workflow } from 'lucide-react'
import { SideBarNavigation } from './ui/SideBarNavigation'

const iconStyle = "mt-1 ml-4 text-gray-500"

export function WorkspaceLayout() {
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
                    <SideBarNavigation label='Channels'>
                        <MessageSquare size={18} className={`${iconStyle}`} />
                    </SideBarNavigation>
                    <SideBarNavigation label='Knowledge Base'>
                        <BookOpen size={18} className={`${iconStyle}`} />
                    </SideBarNavigation>
                    <SideBarNavigation label='AI Assistant'>
                        <BotMessageSquare size={18} className={`${iconStyle}`} />
                    </SideBarNavigation>
                    <SideBarNavigation label='Code Chat'>
                        <Workflow size={18} className={`${iconStyle}`} />
                    </SideBarNavigation> 
                </div>
            </div>
        </div>
    )
}