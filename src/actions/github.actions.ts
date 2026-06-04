import { IAccessibleRepositoriesResponse, IBranchesResponse } from "@/types/types";

const BASE_URL = "http://localhost:3000/v1"

export async function fetchGithubAuthUrlAPI() {
    const response = await fetch(`${BASE_URL}/github`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    return data.url;
}

export async function fetchGithubAppInstallationUrlAPI() {
    const response = await fetch("http://localhost:3000/v1/github/app", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }) 
    const responseJson = await response.json();
    return responseJson.redirectUrl;
}

export async function fetchAccessibleReposAPI(payload: { installationId: string }, token: string ): Promise<IAccessibleRepositoriesResponse> {
    const response = await fetch(`${BASE_URL}/github/accessible-repositories`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(payload)
    })
    return await response.json();
}

export async function fetchBranchesAPI(payload: {installationId: string, repo: string, owner: string}, token: string): Promise<IBranchesResponse> {
    const response = await fetch(`${BASE_URL}/github/repository-branches`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(payload)  
    })
    return await response.json();
}