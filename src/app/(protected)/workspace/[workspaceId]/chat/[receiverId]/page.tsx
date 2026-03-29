export default async function ChatMember({params}: { params: Promise<{ workspaceId: string, receiverId: string }> }){ 
    const { workspaceId, receiverId } = await params;
    // api call to fetch chat history
    return (
        <div>
            <p className="w-3/4">Chat Member {receiverId}</p>
        </div>
    )
}