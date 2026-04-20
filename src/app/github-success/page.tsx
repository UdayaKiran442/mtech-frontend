import GithubSuccess from "@/components/GithubSuccess"
import { getAuthenticatedUser } from "@/lib/user"

export default async function GitHubSuccessPage(){
    const { token, userProfile } = await getAuthenticatedUser()
    if (!token || !userProfile) {
        // handle unauthenticated state, maybe redirect to login page
        return <p>Authentication failed. Please try again.</p>
    }
    return (
        <GithubSuccess token={token} userId={userProfile.user.userId} />
    )
}