"use server"

import { cookies } from 'next/headers'

export async function getGithubToken() {
    const cookieStore = await cookies()
    const token = cookieStore.get("github_token")?.value
    return token || null
}