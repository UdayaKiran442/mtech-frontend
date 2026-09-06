import { fetchCodebotChatsAPI } from "@/actions/codebot.actions";
import { SquareTerminal } from "lucide-react";

export async function CodeBotLayoutComponent({ workspaceId, token }: { workspaceId: string; token: string }) {
    const codebotChatsResponse = await fetchCodebotChatsAPI({ workspaceId: workspaceId }, token);
    return (
        <div>
            <div className="flex justify-between w-full">
                <p className="text-text text-sm">Chats</p>
                <p className="text-text text-sm">+ New</p>
            </div>
            <div>
                <div>
                    {codebotChatsResponse.codebotChats.length > 0 ? (
                        codebotChatsResponse.codebotChats.map((chat) => (
                            <div key={chat.codebotChatId} className="flex gap-2 items-center mt-4 p-2 cursor-pointer bg-bg_secondary" >
                                <SquareTerminal className="text-icon_primary" size={26} color="green" />
                                <p key={chat.codebotChatId} className="text-text text-sm truncate">
                                    {chat.codebotChatName || `${chat.codebotChatId}`}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-text text-sm mt-4">No chats found</p>
                    )}
                </div>
            </div>
        </div>
    )
}