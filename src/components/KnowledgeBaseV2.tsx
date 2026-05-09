"use client"

import { IDocumentAPIResponse, uploadDocumentToAWS } from "@/actions/service.actions";
import { H6 } from "./ui/Typography";
import { Upload, BookOpen, Trash2 } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { addKnowledgeToWorkspaceAPI } from "@/actions/workspace.actions";

export default function KnowledgeBaseV2({ documents, workspaceId, token }: { documents: IDocumentAPIResponse['documents']; workspaceId: string; token: string }) {
    const fileInpuRef = useRef<HTMLInputElement>(null);

    function handleDivClick() {
        fileInpuRef.current?.click();
    }

    async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const formData = new FormData();
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        // handle file upload logic here
        formData.append('file', file as File)
        formData.append('workspaceId', workspaceId)
        const uploadResponse = await uploadDocumentToAWS(formData);
        if (uploadResponse.success) {
            const addKnowledge = await addKnowledgeToWorkspaceAPI({
                workspaceId,
                fileUrl: uploadResponse.uploadLink.url,
                key: uploadResponse.uploadLink.key,
                index: "knowledge-base"
            }, token)
            if (addKnowledge.success) {
                // ideally we should update the documents state here to avoid another api call to fetch documents. But for now we will just reload the page to fetch the updated documents list.
                location.reload();                
            }
            else {
                // TODO: aws upload succeeded but adding knowledge to workspace failed. We should ideally delete the uploaded file from aws in this case to avoid orphan files.
            }
        }
        else {
            // handle upload error
        }

    }
    return (
        <div className="bg-bg_primary h-screen">
            <H6 className="p-8 text-white font-normal">Knowledge Base</H6>
            <div className="border-b-2 border-border_primary"></div>
            <div onClick={handleDivClick} className="cursor-pointer bg-[#161616] p-12 rounded-xl border-dotted border-2 border-border_primary mt-10 ml-10 w-4xl hover:border-[#00F0FF]">
                <input type="file" ref={fileInpuRef} className="hidden" accept=".pdf" onChange={async (e) => await handleFileChange(e)} />
                <div className="flex flex-col items-center">
                    <Upload size={48} className="text-gray-400" />
                    <p className="text-white mt-3.5">Upload files to add to knowledge base</p>
                    <p className="text-gray-400 text-[0.7rem] mt-1">Supported only .pdf files. Click to browse</p>
                </div>
            </div>
            {
                documents.length > 0 ? (
                    <div className="p-12 mb-1">
                        <p className="text-text text-sm">Documents ({documents.length})</p>
                        {documents.map((doc) => (
                            <div className="mb-4" key={doc.key}>
                                <div className="w-4xl bg-[#161616] mt-1 p-2.5 border-2 border-border_primary flex justify-between">
                                    <div className="flex gap-4 items-center">
                                        <p className="text-[#00F0FF] text-[0.7rem]">PDF</p>
                                        <p className="text-white text-sm">{doc.key.split('/').pop()}</p>
                                    </div>
                                    <Trash2 size={18} className="text-icon_primary hover:text-red-500 cursor-pointer" />
                                </div>
                            </div>
                        ))}
                    </div>

                ) : <div className="p-12">
                    <p className="text-text text-sm">
                        Documents (0)
                    </p>
                    <div className="w-4xl mt-1 p-12 rounded-md border border-border_primary">
                        <div className="flex flex-col items-center">
                            <BookOpen size={48} className="text-gray-400" />
                            <p className="text-white mt-3.5">No Documents yet</p>
                            <p className="text-gray-400 text-[0.7rem] mt-1">Upload only PDF's. This will be passed as context to Codebot.</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}