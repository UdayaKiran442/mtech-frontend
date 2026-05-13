import { CodeBotLayoutComponent } from "@/components/CodeBotLayout";

export default async function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex bg-bg_primary h-screen w-full">
            <div className="w-[20%] p-5 border-r border-b border-border_primary h-screen">
                <CodeBotLayoutComponent />
            </div>

            <div className="w-[80%] p-5">
                {children}
            </div>
        </div>
    )
}