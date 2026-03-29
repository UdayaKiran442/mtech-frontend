"use server"
import { cookies } from 'next/headers'

import { getUserProfileAPI } from "@/actions/user.actions"


export async function getAuthenticatedUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    let isAuthenticated = false;
    if (token) {
        const userProfile = await getUserProfileAPI(token)
        isAuthenticated = userProfile?.success === true;
        return { isAuthenticated, userProfile, token }
    }
    return { isAuthenticated }
}