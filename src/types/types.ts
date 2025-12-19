// user api payload and response types

export type IGetUserProfileAPIResponse = {
    success: boolean,
    user: {
        name: string,
        email: string,
        role: string,
        workspaceId: string,
        organisationId: string
    }
}

type SuccessResponse = {
    success: boolean,
    message: string
}

export type ICreateOrganisationPayload = {
    orgName: string,
    orgSize: string,
    industry: string,
    orgLogoUrl: string | null
}

export type ICreateOrganisationResponse = SuccessResponse & {
    organisation: {
        organisationId: string,
        orgName: string,
        orgSize: string,
        industry: string,
        orgLogoUrl: string | null,
        adminId: string
    }
}

export type ICreateWorkspacePayload = {
    workspaceUrl: string,
    workspaceName: string,
    organisationId: string
}

export type ICreateWorkspaceResponse = SuccessResponse & {
    workspace: {
        workspaceId: string,
        workspaceName: string,
        workspaceUrl: string,
        organisationId: string,
        createdAt: Date,
        updatedAt: Date
    }
}