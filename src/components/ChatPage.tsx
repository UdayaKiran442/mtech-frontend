"use client"

import socket from "@/config/socket";
import { IMessage } from "@/types/types"
import { useEffect, useState } from "react";

type IChatPageProps = {
    messages: IMessage[],
    currentUserId: string,
    conversationId: string
}

export function ChatPage({ messages, currentUserId, conversationId }: IChatPageProps) {
    const [chatMessages, setChatMessages] = useState<IMessage[]>(messages);
    const [newMessage, setNewMessage] = useState<string>("");

    function handleSendMessage() { }

    useEffect(() => {
        console.log("Setting up socket connection and listeners...");
        socket.on("connect", () => {
            console.log("Connected to socket server with ID:");
            console.log(socket.id);
        });

        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
            
        });

        socket.on("disconnect", (reason) => {
            console.warn("Disconnected:", reason);
        });
    }, []);

    return (
        <div className="h-screen flex flex-col">
            {/* chat messages */}
            <div className="flex-1 overflow-y-auto">
                {/* Your chat messages content here */}
                <div className="p-4">
                    {
                        chatMessages.map((message) => (
                            <div key={message.messageId} className={`mb-4 ${message.senderId !== currentUserId ? "" : "text-right"}`}>
                                <div className={`${message.senderId !== currentUserId ? "bg-gray-200" : "bg-blue-500"} rounded-lg p-3 inline-block`}>
                                    <p className={`text-sm ${message.senderId !== currentUserId ? "text-gray-800" : "text-white"}`}>{message.text}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* input box */}
            <div className="fixed bottom-0 w-full p-4">
                <div className="bg-white rounded-lg shadow-lg">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        name="input"
                        id="input"
                        className="w-[65%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSendMessage} className="cursor-pointer ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}
