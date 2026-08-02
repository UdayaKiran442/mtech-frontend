import { ISearchFilesResponseAPI } from "@/types/types"

const BASE_URL = "http://localhost:3000/v1/search"

export async function searchFilesAPI(payload: {searchString: string, workspaceId: string, repoName: string, branch: string},token: string): Promise<ISearchFilesResponseAPI> {
    const response = await fetch(`${BASE_URL}/files`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(payload)
    })   
    return await response.json();
}