import { H3 } from "./ui/Typography";

export function KnowledgeBaseComponent() {
    return (
        <div className="flex justify-between items-start h-screen p-8 bg-gray-100">
            {/* list of documents */}
            <div className="flex-1 max-w-sm bg-white rounded-lg p-6 shadow-md overflow-y-auto">
                <H3 className="text-xl font-bold text-gray-800 mb-6">Documents</H3>
                <p className="mb-4 p-3 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-200 cursor-pointer">Document 1</p>
                <p className="mb-4 p-3 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-200 cursor-pointer">Document 2</p>
                <p className="mb-4 p-3 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-200 cursor-pointer">Document 3</p>
            </div>
            {/* document preview */}
            <div className="flex-1 max-w-lg bg-white rounded-lg p-6 shadow-md mx-6 overflow-y-auto">
                <H3 className="text-xl font-bold text-gray-800 mb-6">Preview</H3>
                <p>Document Preview</p>
            </div>
            {/* preview document metadata info */}
            <div className="flex-1 max-w-lg bg-white rounded-lg p-6 shadow-md overflow-y-auto">
                <H3 className="text-xl font-bold text-gray-800 mb-6">Metadata</H3>
                <p>Size: 1024 KB</p>
                <p>Type: PDF</p>
                <p>Created: 01/01/2024</p>
                <p>Last Modified: 01/02/2024</p>
            </div>
        </div>
    );
}