"use client"

import { useSearchParams } from 'next/navigation'


export default function GithubSuccess({ token, userId }: { token: string; userId: string }) {
    // fetch username from url query params
    const searchParams = useSearchParams();
    const username = searchParams.get("username");
    console.log("Github auth success for user", username, "with token", token, "and userId", userId);
    return (
        <div>
            <h1 className="text-2xl font-bold">GitHub Authentication Successful!</h1>
            <p>You can now close this window and return to the application.</p>
        </div>
    )
}