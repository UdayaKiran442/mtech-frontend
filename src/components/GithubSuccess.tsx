"use client"

import { useSearchParams } from 'next/navigation'
import { setCookie } from 'cookies-next'
import { updateUserAPI } from '@/actions/user.actions';
import { useEffect } from 'react';
import { useRouter } from "next/navigation"

export default function GithubSuccess({ token, userId }: { token: string; userId: string }) {
    // fetch username from url query params
    const searchParams = useSearchParams();
    const router = useRouter();
    const username = searchParams.get("username");
    const accessToken = searchParams.get("accessToken");
    setCookie("github_token", accessToken)
    async function updateUser() {
        const updateUserAPIResponse = await updateUserAPI(token, {
            userId: userId,
            isGitHubConnected: true,
            githubUsername: username || undefined
        })
        if (updateUserAPIResponse.success) {
            router.push("/")
            alert("GitHub account connected successfully!")
        }
        else {
            alert("Failed to connect GitHub account. Please try again.")
            router.push("/")
        }
        
    }
    useEffect(() => {
        if (username && accessToken) {
            updateUser();
        }
    }, [username, accessToken])
    return (
        <div>
            <h1 className="text-2xl font-bold">GitHub Authentication Successful!</h1>
            <p>You can now close this window and return to the application.</p>
        </div>
    )
}