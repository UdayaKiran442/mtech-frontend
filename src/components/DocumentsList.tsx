import { IWorkspaceDocument } from "@/types/types";
import { Input } from "./ui/Input";
import { H4 } from "./ui/Typography";

export function DocumentsList({ workspaceDocuments }: { workspaceDocuments: IWorkspaceDocument[] }) {
    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <H4>Documents</H4>
                </div>
                <div>
                    <button className="border-white text-white bg-blue-500 cursor-pointer rounded px-2 py-1">+ Add Document</button>
                </div>
            </div>
            <Input className="border mt-7 w-[90%] focus:border-blue-700" id="search" name="search" placeholder="Search Documents" type="text" required />
            <div className="border-b mt-10"></div>
            <div>
                {workspaceDocuments.map(doc => (
                    <div key={doc.key} className="flex items-center gap-2 mt-4 cursor-pointer hover:bg-gray-100 hover:p-2">
                        <div className="w-8 h-8 rounded bg-gray-300"></div>
                        <div>
                            <p className="font-medium">{doc.key.split('/')[1]}</p>
                            <p className="text-sm text-gray-500">Last edited: 2 hours ago</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}