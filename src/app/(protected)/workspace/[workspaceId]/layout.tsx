// app/(protected)/layout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import UserHydrator from "@/components/UserHydrator";
import { getAuthenticatedUser } from "@/lib/user";
import { WorkspaceLayout } from "@/components/WorkspaceLayout";
import { getUserWorkspacesAPI } from "@/actions/user.actions";

export const dynamic = "force-dynamic";


export default async function ProtectedLayout({ children, params }: { children: ReactNode; params: Promise<{ workspaceId: string }> }) {
  const { isAuthenticated, userProfile, token } = await getAuthenticatedUser();
  const { workspaceId } = await params;

  if (!isAuthenticated) redirect("/");

  if (isAuthenticated && userProfile) {
    const userWorkspaces = await getUserWorkspacesAPI(token);
    if (userWorkspaces.success) {
      const activeWorkspace = userWorkspaces.workspaces.find(ws => ws.workspaceId === workspaceId);
      if (activeWorkspace) {
        return (
          <>
            <UserHydrator user={userProfile} />
            <div className="flex w-full ">
              <div className="w-[20%] border-r border-gray-100">
                <WorkspaceLayout workspaces={userWorkspaces.workspaces} activeWorkspace={activeWorkspace} />
              </div>
              <div className="flex-1 w-3/4">
                {children}
              </div>
            </div>
          </>
        );
      }
    }
  }
}
