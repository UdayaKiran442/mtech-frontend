import { ICreateOrganisationPayload, ICreateOrganisationResponse } from "@/types/types";

const BASE_URL = "http://localhost:3000/v1"

export async function createOrganisationAPI(payload: ICreateOrganisationPayload, token: string): Promise<ICreateOrganisationResponse> {
    const createOrganisation = await fetch(`${BASE_URL}/organisation/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`

        },
        body: JSON.stringify(payload)
    })
    return await createOrganisation.json()
}