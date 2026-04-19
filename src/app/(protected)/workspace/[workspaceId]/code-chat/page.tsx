import { getGithubToken } from "@/lib/githubToken"

export default async function CodeChat() {
    const githubToken = await getGithubToken();
    if (!githubToken) {
        return (
            <p className="w-3/4">Please connect your GitHub account to use CodeChat.</p>
        )
    }
    return (
        <p className="w-3/4">CodeChat</p>
    )
}