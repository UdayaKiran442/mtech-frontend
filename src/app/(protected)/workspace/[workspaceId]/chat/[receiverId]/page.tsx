import { fetchChatHistoryAPI } from "@/actions/chat.actions";
import { getAuthenticatedUser } from "@/lib/user";

export default async function ChatMember({params}: { params: Promise<{ workspaceId: string, receiverId: string }> }){ 
    const { workspaceId, receiverId } = await params;
    const { token } = await getAuthenticatedUser(); // get user token for authentication
    // api call to fetch chat history
    if (!token) {
        // handle unauthenticated state, maybe redirect to login page
    }
    else {
        const chatMessages = await fetchChatHistoryAPI({receiverId}, token)
        return (
            <div>
                <p className="w-3/4">Chat Member {receiverId}</p>
            </div>
        )
    }
}