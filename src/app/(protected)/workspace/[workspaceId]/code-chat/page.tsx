import { Codebot } from "@/components/CodeBot";
import { ConnectGithub } from "@/components/ConnectGithub";
import { getAuthenticatedUser } from "@/lib/user";

export default async function CodeChat() {
    const { userProfile } = await getAuthenticatedUser();
    const isConnectedToGithub = userProfile?.user.isGithubConnected;
    if (!isConnectedToGithub) {
        return <ConnectGithub />;
    }
    return (
        <Codebot />
    )
}