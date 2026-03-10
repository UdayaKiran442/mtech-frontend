import { FileText } from "lucide-react";
import { H6, Tagline } from "./ui/Typography";

export function DocumentsView() {
    return (
        <div className="border-l rounded h-full w-full flex items-center justify-center">    
            <div className="flex flex-col h-full items-center justify-center gap-4">
                <FileText />
                <H6>No Document Selected</H6>
                <Tagline>Select a document to preview its content</Tagline>
            </div>
        </div>
    )
}