import { fetchWorkspaceDocumentsAPI } from "@/actions/service.actions";
import { KnowledgeBaseComponent } from "@/components/KnowledgeBase";
import KnowledgeBaseV2 from "@/components/KnowledgeBaseV2";
import { getAuthenticatedUser } from "@/lib/user";
import { redirect } from "next/navigation";


export default async function KnowledgeBase(){
    const { userProfile, token } = await getAuthenticatedUser();
    if (!userProfile || !token){
        redirect("/")
    }
    const fetchDocumentsAPIResponse = await fetchWorkspaceDocumentsAPI({workspaceId: userProfile.workspace.workspaceId}, token);
    if (!fetchDocumentsAPIResponse.success){
        // handle error
        return <div>Error fetching documents</div>
    }
    const documents = fetchDocumentsAPIResponse.documents;
    
    return (
       <KnowledgeBaseV2 workspaceId={userProfile.workspace.workspaceId} documents={documents} token={token} />
    )
}