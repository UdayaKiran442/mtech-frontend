import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Workspace({params}: {params: {workspaceId: string}}) {
    const { workspaceId } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value
    if (token) {
        // redirect to chat route
        redirect(`/workspace/${workspaceId}/chat`);
    }
}