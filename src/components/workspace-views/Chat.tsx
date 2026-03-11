"use client"

import { IWorkspaceMember } from "@/types/types"

type IChatProps = {
    workspaceMembers: IWorkspaceMember[]
}

export function Chat({ workspaceMembers }: IChatProps) {
    return (
        <div className="flex justify-between">
            <div>
                <p>Chat</p>
            </div>
            <div className="w-1/3 p-4 bg-gray-100 rounded fixed right-0 top-0">
                <p>Members</p>
                <ul>
                    {workspaceMembers.map(member => (
                        <li key={member.memberId}>{member.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}