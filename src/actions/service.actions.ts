import { IFetchWorkspaceDocumentsResponse } from "@/types/types"

const BASE_URL = "http://localhost:3000/v1"


export async function fetchWorkspaceDocumentsAPI(payload: { workspaceId: string }): Promise<IFetchWorkspaceDocumentsResponse> {
    const fetchWorkspaceDocuments = await fetch(`${BASE_URL}/service/aws/fetch-documents`, {
        method: 'POST',
        headers: {
             "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    return await fetchWorkspaceDocuments.json()
}