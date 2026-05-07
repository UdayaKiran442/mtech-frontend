import { IWorkspaceView } from "@/types/types";

type ISideBarNavigationProps = {
    children: React.ReactNode;
    label: string;
    view: IWorkspaceView;
}

export function SideBarNavigation({children, label, view}: ISideBarNavigationProps) {
    return (
        <div>
            <div className={`flex gap-3 items-center mt-6 p-2 cursor-pointer ${label === view ? "bg-bg_secondary py-2 border-l-2 border-[#00F0FF]" : "hover:bg-bg_secondary hover:py-2 hover:border-l-2 hover:border-[#00F0FF]"}`}>
                {children}
                <p className={`font-semibold text-sm ${label === view ? "font-bold text-white" : "text-text"} `}>{label}</p>
            </div>
        </div>
    )
}