import { fetchChatHistoryAPI, getConversationIdAPI } from "@/actions/chat.actions";
import { ChatPage } from "@/components/ChatPage";
import { getAuthenticatedUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function ChatMember({params}: { params: Promise<{ workspaceId: string, receiverId: string }> }){ 
    const { receiverId } = await params;
    const { token, userProfile } = await getAuthenticatedUser(); // get user token for authentication

    if (!userProfile) {
        // handle unauthenticated state, maybe redirect to login page
        redirect("/")
    }
    else {
        const conversationIdResponse = await getConversationIdAPI({ receiverId, type: "dm" }, token);
        const chatMessages = await fetchChatHistoryAPI({ conversationId: conversationIdResponse.conversationId }, token)
        return (
            <div>
               <ChatPage conversationId={conversationIdResponse.conversationId} messages={chatMessages.messages} currentUserId={userProfile.user.userId} />
            </div>
        )
    }
}