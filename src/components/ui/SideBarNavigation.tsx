import { IWorkspaceView } from "@/types/types";

type ISideBarNavigationProps = {
    children: React.ReactNode;
    label: string;
    view: IWorkspaceView;
}

export function SideBarNavigation({children, label, view}: ISideBarNavigationProps) {
    console.log("view and label", view, label)
    return (
        <div>
            <div className={`flex gap-3 items-center mt-6 p-2 cursor-pointer ${label === view ? "bg-blue-500 py-2 rounded-2xl" : "hover:bg-gray-100 hover:p-1 rounded "}`}>
                {children}
                <p className={`font-semibold text-gray-600 ${label === view ? "text-white font-bold" : ""} `}>{label}</p>
            </div>
        </div>
    )
}