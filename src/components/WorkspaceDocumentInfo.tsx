import { IDocumentAPIResponse } from "@/actions/service.actions";
import { IWorkspaceDocument } from "@/types/types";
import { Calendar, FileText, HardDrive } from "lucide-react";
import { H3 } from "./ui/Typography";

type DocumentCardProps = {
  documents: IDocumentAPIResponse['documents'],
  selectedDocument: IWorkspaceDocument | null,
  handleDocumentClick: (doc: IWorkspaceDocument) => void
}

export function DocumentCard({ documents, selectedDocument, handleDocumentClick }: DocumentCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
      <H3 className="text-lg font-semibold text-gray-800 mb-4">
        Documents
      </H3>

      {/* All documents */}
      <div className="space-y-3">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div
              key={doc.key} // Use doc.key as key if available
              className={`flex items-center gap-3 p-4 rounded-2xl border hover:bg-gray-100 cursor-pointer transition ${selectedDocument?.key === doc.key ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
              onClick={() => handleDocumentClick(doc)}
            >
              <FileText className="text-gray-600" size={18} />
              <p className="text-sm font-medium text-gray-700 truncate">
                {doc.key.split("/")[1]}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No documents available.</p>
        )}
      </div>
    </div>

  )
}

export function DocumentMetadata({ selectedDocument }: { selectedDocument: IWorkspaceDocument | null }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
      <H3 className="text-lg font-semibold text-gray-800 mb-4">
        Metadata
      </H3>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
          <HardDrive size={18} className="text-gray-600" />
          <div>
            <p className="text-xs text-gray-500">Size</p>
            <p className="text-sm font-medium text-gray-800">{selectedDocument?.size || "0 KB"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
          <FileText size={18} className="text-gray-600" />
          <div>
            <p className="text-xs text-gray-500">Type</p>
            <p className="text-sm font-medium text-gray-800">{selectedDocument?.type || "Unknown"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
          <Calendar size={18} className="text-gray-600" />
          <div>
            <p className="text-xs text-gray-500">Created At</p>
            <p className="text-sm font-medium text-gray-800">
              {selectedDocument?.lastModified ? selectedDocument.lastModified.toDateString() : "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DocumentPreview({ selectedDocument }: { selectedDocument: IWorkspaceDocument | null }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
      <H3 className="text-lg font-semibold text-gray-800 mb-4">
        Preview
      </H3>

      <div className="h-[400px] rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
        {selectedDocument ? (
          //   <PdfViewer url={selectedDocument.url} />
          <p>PDF Preview coming soon...</p>
        ) : (
          <p>Select a document to preview</p>
        )}
      </div>
    </div>
  )
}