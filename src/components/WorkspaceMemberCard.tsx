import { IWorkspaceMember } from "@/types/types";

export default function WorkspaceMemberCard({member}: { member: IWorkspaceMember}){
    return (
        <div className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">{member.name.charAt(0)}</span>
            </div>
            <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-gray-500">{member.email}</p>
            </div>
        </div>
    )
}