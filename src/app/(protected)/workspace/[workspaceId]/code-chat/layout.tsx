import { CodeBotLayoutComponent } from "@/components/CodeBotLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children, params }: { children: React.ReactNode; params: { workspaceId: string } }) {
    const { workspaceId } = await params;
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) {
        redirect("/");
    }
    return (
        <div className="flex bg-bg_primary h-screen w-full">
            <div className="w-[20%] p-5 border-r border-b border-border_primary h-screen">
                <CodeBotLayoutComponent token={token} workspaceId={workspaceId} />
            </div>

            <div className="w-[80%] p-5">
                {children}
            </div>
        </div>
    )
}