import { IWorkspaceView } from "@/types/types";

type ISideBarNavigationProps = {
    children: React.ReactNode;
    label: string;
    view: IWorkspaceView;
}

export function SideBarNavigation({children, label, view}: ISideBarNavigationProps) {
    return (
        <div>
            <div className={`flex gap-3 items-center mt-6 p-2 cursor-pointer ${label === view ? "bg-bg_secondary py-2 rounded-2xl" : "hover:bg-bg_secondary hover:py-2 hover:rounded-2xl"}`}>
                {children}
                <p className={`font-semibold text-text ${label === view ? "font-bold" : ""} `}>{label}</p>
            </div>
        </div>
    )
}