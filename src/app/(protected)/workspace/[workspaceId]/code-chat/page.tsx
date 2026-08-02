import { fetchAccessibleReposAPI } from "@/actions/github.actions";
import { Codebot } from "@/components/CodeBot";
import { ConnectGithub } from "@/components/ConnectGithub";
import { getAuthenticatedUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function CodeChat({ params }: { params: Promise<{ workspaceId: string }> }) {
    const { workspaceId } = await params;
    const { userProfile, token } = await getAuthenticatedUser();
    if (!userProfile || !token || !userProfile.user.githubInstallationId) {
        redirect("/");
    }
    const isConnectedToGithub = userProfile?.user.isGithubConnected;


    if (isConnectedToGithub && userProfile.user.githubInstallationId) {
        const repositories = await fetchAccessibleReposAPI({
            installationId: userProfile?.user.githubInstallationId,
        }, token);
        return (
            <Codebot workspaceId={workspaceId} repositories={repositories.repositories.repositories} installationId={userProfile?.user.githubInstallationId} token={token} />
        )
    }


    return <ConnectGithub />;

}