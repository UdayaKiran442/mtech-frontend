import { fetchWorkspaceDocumentsAPI } from "@/actions/service.actions";
import { getUserWorkspacesAPI } from "@/actions/user.actions";
import WorkspaceComponent from "@/components/Workspace";
import { cookies } from "next/headers";

export default async function Workspace({params}: {params: {workspaceId: string}}) {
    const { workspaceId } = await params
    // fetch users of workspace

    // fetch user workspaces
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value
    if (token) {
        const userWorkspaces = await getUserWorkspacesAPI(token);
        if (userWorkspaces.success) {
            const activeWorkspace = userWorkspaces.workspaces.find(ws => ws.workspaceId === workspaceId);
            if (activeWorkspace){
                // call api to fetch documents of workspace and pass it to workspace component
                const workspaceDocuments = await fetchWorkspaceDocumentsAPI({workspaceId})
                return (
                    <div>
                        <WorkspaceComponent workspaceDocuments={workspaceDocuments.documents} activeWorkspace={activeWorkspace} workspaces={userWorkspaces.workspaces} />
                    </div>
                )
            }
        }
    }
}