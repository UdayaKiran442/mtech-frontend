"use client";

import { Upload, FileText, Calendar, HardDrive, X } from "lucide-react";
import { H3 } from "./ui/Typography";
import { IWorkspaceDocument } from "@/types/types";
import { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { IDocumentAPIResponse, uploadDocumentToAWS } from "@/actions/service.actions";
import { addKnowledgeToWorkspaceAPI } from "@/actions/workspace.actions";
import { DocumentCard, DocumentMetadata, DocumentPreview } from "./WorkspaceDocumentInfo";

export function KnowledgeBaseComponent({ documents, workspaceId, token }: { documents: IDocumentAPIResponse['documents']; workspaceId: string; token: string }) {
    const [selectedDocument, setSelectedDocument] = useState<IWorkspaceDocument | null>(null);
    const [open, setOpen] = useState(false);

    const formData = new FormData();

    function toggleOpen() {
        setOpen(!open);
    }

    function handleDocumentClick(doc: IWorkspaceDocument) {
        setSelectedDocument(doc);
    }

    function handleUpload(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            formData.append('file', file as File)
            formData.append('workspaceId', workspaceId)
        }
    }

    async function handleSubmit() {
        const file = formData.get('file') as File;
        if (!file) {
            // handle error - no file selected
            return;
        }
        const uploadResponse = await uploadDocumentToAWS(formData);
        if (uploadResponse.success) {
            // call api to save document metadata to db
            const addKnowledgeResponse = await addKnowledgeToWorkspaceAPI({
                workspaceId,
                fileUrl: uploadResponse.uploadLink.url,
                key: uploadResponse.uploadLink.key
            }, token)
            if (addKnowledgeResponse.success) {
                toggleOpen();
            }
        }
        else {
            // handle upload error
        }
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
                    <DocumentCard documents={documents} selectedDocument={selectedDocument} handleDocumentClick={handleDocumentClick} />

                    {/* Document Preview */}
                    <DocumentPreview selectedDocument={selectedDocument} />

                    {/* Metadata */}
                    <DocumentMetadata selectedDocument={selectedDocument} />
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
