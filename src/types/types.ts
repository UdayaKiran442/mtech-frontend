// user api payload and response types

export type IGetUserProfileAPIResponse = {
    success: boolean,
    user: {
        userId: string,
        name: string,
        email: string,
        organisationId: string
    }
    workspace: {
        workspaceId: string,
        workspaceName: string,
        workspaceUrl: string,
        memberId: string,
        role: string
    }
}

type SuccessResponse = {
    success: boolean,
    message?: string
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

export type IWorkspaceView = "Channels" | "AI Assistant" | "Knowledge Base" | "Code Chat"

export type IUserWorkspacesResponse = SuccessResponse & {
    workspaces: {
        workspaceId: string,
        workspaceName: string,
        workspaceUrl: string,
        memberId: string,
        role: string
    }[]
}

export type IActiveWorkspace = {
    workspaceId: string,
    workspaceName: string,
    workspaceUrl: string,
    memberId: string,
    role: string
}

export type IWorkspaceDocument = {
    key: string,
    url: string,
    size: number,
    lastModified: Date
    type: string
}

export type IFetchWorkspaceDocumentsResponse = SuccessResponse & {
    documents: IWorkspaceDocument[]
}

export type IWorkspaceMember = {
     memberId: string,
     workspaceId: string,
     userId: string,
     name: string,
     email: string,
     role: string
}

export type IFetchWorkspaceMembersResponse = SuccessResponse & {
    members: IWorkspaceMember[]
}