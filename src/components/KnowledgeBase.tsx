"use client";

import { Upload, FileText, Calendar, HardDrive, X } from "lucide-react";
import { H3 } from "./ui/Typography";
import { IWorkspaceDocument } from "@/types/types";
import { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { IDocumentAPIResponse } from "@/actions/service.actions";

export function KnowledgeBaseComponent({ documents, workspaceId }: { documents: IDocumentAPIResponse['documents']; workspaceId: string }) {
    const [selectedDocument, setSelectedDocument] = useState<IWorkspaceDocument | null>(null);
    const [open, setOpen] = useState(false);

    const formData = new FormData();

    function toggleOpen() {
        setOpen(!open);
    }

    function handleDocumentClick(doc: IWorkspaceDocument) {
        setSelectedDocument(doc);
    }

    function handleUpload(e: ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];
        if (file) {
            formData.append('file', file as File)
            formData.append('workspaceId', workspaceId)
        }
    }

    async function handleSubmit(){
        const file = formData.get('file') as File;
        console.log(await file.arrayBuffer())
    }

    // Close modal when clicking outside
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open]);

    return (
        <div className={`relative min-h-[80vh] bg-linear-to-br from-slate-50 to-gray-100 p-6 rounded-3xl shadow-sm ${open ? 'overflow-hidden' : ''}`}>
          {/* Backdrop - appears only when modal is open */}
          {open && (
            <div 
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300"
              onClick={toggleOpen}
            />
          )}

          {/* Main Content */}
          <div className="min-h-[80vh] bg-linear-to-br from-slate-50 to-gray-100 p-6 rounded-3xl shadow-sm relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <H3 className="text-2xl font-bold text-gray-800">
                  Knowledge Base
                </H3>
                <p className="text-sm text-gray-500 mt-1">
                  Manage, preview, and organize your documents
                </p>
              </div>

              <button 
                onClick={toggleOpen} 
                className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-2xl shadow-md hover:scale-[1.02] transition-all duration-200"
              >
                <Upload size={18} />
                Upload Document
              </button>
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Documents List */}
              <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
                <H3 className="text-lg font-semibold text-gray-800 mb-4">
                  Documents
                </H3>

                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div
                      key={doc.key || index} // Use doc.key as key if available
                      className={`flex items-center gap-3 p-4 rounded-2xl border hover:bg-gray-100 cursor-pointer transition ${selectedDocument?.key === doc.key ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
                      onClick={() => handleDocumentClick(doc)}
                    >
                      <FileText className="text-gray-600" size={18} />
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {doc.key.split("/")[1] || `Document ${index + 1}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Preview */}
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

              {/* Metadata */}
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
            </div>
          </div>

          {/* Upload Modal (moved outside the main layout for better performance) */}
          {open && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={toggleOpen}
            >
              <div 
                className="bg-white rounded-3xl p-6 w-[400px] max-w-full mx-4 transform transition-all duration-300 ease-out"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <H3 className="text-xl font-bold">Upload Document</H3>
                  <button 
                    onClick={toggleOpen}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-700 transition"
                  >
                    <X size={18} />
                    <span className="text-sm">Close</span>
                  </button>
                </div>
                <div>
                    <input 
                      type="file" 
                      id="upload-file"
                      className="px-3 py-2 mt-2 border rounded-lg w-full text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      accept=".pdf"
                      onChange={(e) => handleUpload(e)}
                      required
                    />
                    <button onClick={handleSubmit} className="cursor-pointer mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Submit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}
