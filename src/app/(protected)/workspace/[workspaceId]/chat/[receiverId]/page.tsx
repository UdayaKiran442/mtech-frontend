import { fetchChatHistoryAPI } from "@/actions/chat.actions";
import { ChatPage } from "@/components/ChatPage";
import { getAuthenticatedUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function ChatMember({params}: { params: Promise<{ workspaceId: string, receiverId: string }> }){ 
    const { workspaceId, receiverId } = await params;
    const { token, userProfile } = await getAuthenticatedUser(); // get user token for authentication

    if (!userProfile) {
        // handle unauthenticated state, maybe redirect to login page
        redirect("/")
    }
    else {
        const chatMessages = await fetchChatHistoryAPI({receiverId}, token)
        return (
            <div>
               <ChatPage messages={chatMessages.messages} currentUserId={userProfile.user.userId} />
            </div>
        )
    }
}