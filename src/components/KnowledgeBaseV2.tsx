"use client"

import { IDocumentAPIResponse } from "@/actions/service.actions";
import { H6 } from "./ui/Typography";
import { Upload } from "lucide-react";

export default function KnowledgeBaseV2({ documents, workspaceId, token }: { documents: IDocumentAPIResponse['documents']; workspaceId: string; token: string }) {
    return (
        <div className="bg-bg_primary h-screen">
            <H6 className="p-8 text-white font-normal">Knowledge Base</H6>
            <div className="border-b-2 border-gray-100"></div>
            <div className="bg-[#191919] p-12 rounded-xl border-dotted border-2 border-gray-500 mt-10 ml-10 w-4xl hover:border-[#00F0FF]">
                <div className="flex flex-col items-center">
                    <Upload size={48} className="text-gray-400" />
                    <p className="text-white mt-3.5">Upload files to add to knowledge base</p>
                    <p className="text-gray-400 text-[0.7rem] mt-1">Supported only .pdf files. Click to browse</p>
                </div>
            </div>
        </div>
    )
}