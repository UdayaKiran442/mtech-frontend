import { redirect } from "next/navigation";
import WorkspaceMemberCard from "@/components/WorkspaceMemberCard";
import { getAuthenticatedUser } from "@/lib/user";
import { fetchWorkspaceMembersAPI } from "@/actions/workspace.actions";

export default async function ChatLayout({ children, params }: { children: React.ReactNode, params: Promise<{ workspaceId: string }> }) {
    const { workspaceId } = await params;
    const { token, isAuthenticated, userProfile } = await getAuthenticatedUser();
    // api call to fetch workspace members and pass it to the right sidebar component
    if (!token || !isAuthenticated) {
        // handle unauthenticated state, maybe redirect to login page
        redirect("/")
    }
    const workspaceMembers = await fetchWorkspaceMembersAPI({ workspaceId }, token);
    if (workspaceMembers.success && workspaceMembers.members.length > 0 && userProfile) {
        const members = workspaceMembers.members.filter(member => member.userId != userProfile.user.userId);
        return (
            <div className="flex w-full">
                <div className="flex-1 w-3/4">
                    {children}
                </div>
                <div className="w-1/4">
                    {members.map(member => (
                        <WorkspaceMemberCard key={member.memberId} member={member} />
                    ))}
                </div>
            </div>
        )
    }
}