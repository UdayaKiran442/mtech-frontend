import { IFetchChatHistoryResponse } from "@/types/types";

const BASE_URL = "http://localhost:3000/v1"

export async function fetchChatHistoryAPI(payload: { receiverId: string }, token: string): Promise<IFetchChatHistoryResponse> {
    const fetchMessages = await fetch(`${BASE_URL}/chat/fetch-messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(payload)
    })
    return await fetchMessages.json();
}