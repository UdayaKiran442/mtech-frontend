"use client"

import { useSearchParams } from 'next/navigation'
import { updateUserAPI } from '@/actions/user.actions';
import { useEffect } from 'react';
import { useRouter } from "next/navigation"

export default function GithubSuccess({ token, userId }: { token: string; userId: string }) {
    // fetch username from url query params
    const searchParams = useSearchParams();
    const router = useRouter();
    const username = searchParams.get("username");
    const installationId = searchParams.get("installation_id");
    async function updateUser() {
        const updateUserAPIResponse = await updateUserAPI(token, {
            userId: userId,
            isGitHubConnected: true,
            githubUsername: username || undefined,
            githubInstallationId: installationId || undefined,
        })
        if (updateUserAPIResponse.success) {
            router.push("/")
        }
        else {
            router.push("/")
        }
        
    }
    useEffect(() => {
        if (username) {
            updateUser();
        }
    }, [username])
    return (
        <div>
            <h1 className="text-2xl font-bold">GitHub Authentication Successful!</h1>
            <p>You can now close this window and return to the application.</p>
        </div>
    )
}