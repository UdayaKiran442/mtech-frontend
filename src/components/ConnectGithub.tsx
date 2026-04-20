"use client"

import { fetchGithubAuthUrlAPI } from "@/actions/github.actions"

export function ConnectGithub() {

    async function handleGithubConnect() {
        const url = await fetchGithubAuthUrlAPI();
        window.location.href = url;
    }

    return (    
        <div className="flex flex-col h-screen justify-center items-center">
            <p>Please connect your GitHub account to use CodeChat.</p>
            <button className="bg-blue-600 text-white cursor-pointer py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-4" onClick={handleGithubConnect}>
                Connect GitHub
            </button>
        </div>
    )
}