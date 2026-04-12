import { IFetchChatHistoryResponse } from "@/types/types";

const BASE_URL = "http://localhost:3000/v1"

export async function fetchChatHistoryAPI(payload: { conversationId: string }, token: string): Promise<IFetchChatHistoryResponse> {
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

export async function getConversationIdAPI(payload: { receiverId: string, type: string }, token: string): Promise<{ conversationId: string, success: boolean }> {
    const fetchConversationId = await fetch(`${BASE_URL}/chat/get-conversationId`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(payload)   
    })
    return await fetchConversationId.json();
}