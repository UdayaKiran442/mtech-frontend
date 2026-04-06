export function ChatPage(){
    return (
        <div className="h-screen flex flex-col">
            {/* chat messages */}
            <div className="flex-1 overflow-y-auto">
                {/* Your chat messages content here */}
                {/* sender and receiver messages can be styled differently for better UX  */}
                <div className="p-4">
                    <div className="mb-4">
                        <div className="bg-gray-200 rounded-lg p-3 inline-block">
                            <p className="text-sm text-gray-800">Hello! How are you?</p>
                        </div>
                    </div>
                    <div className="mb-4 text-right">
                        <div className="bg-blue-500 rounded-lg p-3 inline-block">
                            <p className="text-sm text-white">I'm good, thanks! How about you?</p>
                        </div>
                    </div>
                    {/* more messages */}
                </div>
            </div>
            
            {/* input box */}
            <div className="fixed bottom-0 w-full p-4">
                <div className="bg-white rounded-lg shadow-lg">
                    <input 
                        type="text" 
                        name="input" 
                        id="input" 
                        className="w-[65%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type a message..."
                    />
                    <button className="cursor-pointer ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}
