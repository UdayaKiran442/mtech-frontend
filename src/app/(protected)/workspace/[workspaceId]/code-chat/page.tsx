import { ConnectGithub } from "@/components/ConnectGithub";
import { getGithubToken } from "@/lib/githubToken"

export default async function CodeChat() {
    const githubToken = await getGithubToken();
    if (!githubToken) {
        return <ConnectGithub />;
    }
    return (
        <p>CodeChat</p>
    )
}