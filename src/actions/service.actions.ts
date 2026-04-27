const BASE_URL = "http://localhost:3000/v1"

import { IUploadDocumentToAWSResponse } from "@/types/types";
import z from "zod";

const DocumentAPIResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    documents: z.array(z.object({
        key: z.string(),
        url: z.string(),
        size: z.number(),
        type: z.string(),
        lastModified: z.coerce.date()
    }))
})

export type IDocumentAPIResponse = z.infer<typeof DocumentAPIResponseSchema>


export async function fetchWorkspaceDocumentsAPI(payload: { workspaceId: string }, token: string): Promise<IDocumentAPIResponse> {
    const fetchWorkspaceDocuments = await fetch(`${BASE_URL}/service/aws/fetch-documents`, {
        method: 'POST',
        headers: {
             "Content-Type": "application/json",
             "Authorization": `${token}`
        },
        body: JSON.stringify(payload)
    })
    return DocumentAPIResponseSchema.parse(await fetchWorkspaceDocuments.json())
}

export async function uploadDocumentToAWS(formData: FormData): Promise<IUploadDocumentToAWSResponse> {
    const uploadDocumentResponse = await fetch(`${BASE_URL}/service/aws/upload`, {
        method: 'POST',
        body: formData,
    })
    return await uploadDocumentResponse.json();
}