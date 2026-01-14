
type ISideBarNavigationProps = {
    children: React.ReactNode;
    label: string;
}

export function SideBarNavigation({children, label}: ISideBarNavigationProps) {
    return (
        <div>
            <div className="flex gap-2 items-center mt-6 cursor-pointer hover:bg-gray-100 hover:p-1 rounded">
                {children}
                <p className='font-semibold text-gray-600'>{label}</p>
            </div>
        </div>
    )
}