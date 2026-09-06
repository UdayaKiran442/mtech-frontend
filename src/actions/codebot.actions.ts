import { IFetchCodebotChatsResponseAPI } from "@/types/types";

const BASE_URL = "http://localhost:3000/v1/codebot";

export async function fetchCodebotChatsAPI(payload: { workspaceId: string }, token: string): Promise<IFetchCodebotChatsResponseAPI> {
    const fetchChats = await fetch(`${BASE_URL}/fetch-chats`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(payload)
    })
    return await fetchChats.json();
}