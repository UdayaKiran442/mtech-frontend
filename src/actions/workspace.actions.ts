import { ICreateWorkspacePayload, ICreateWorkspaceResponse, IFetchWorkspaceMembersResponse } from "@/types/types";

const BASE_URL = "http://localhost:3000/v1"

export async function createWorkspaceAPI(payload: ICreateWorkspacePayload, token: string): Promise<ICreateWorkspaceResponse> {
    const createWorkspace = await fetch(`${BASE_URL}/workspace/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(payload)
    })
    return await createWorkspace.json()
}

export async function fetchWorkspaceMembersAPI(payload: {workspaceId: string}, token: string): Promise<IFetchWorkspaceMembersResponse> {
    const workspaceMembers = await fetch(`${BASE_URL}/workspace/fetch-members`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(payload)
    })
    return await workspaceMembers.json()
}