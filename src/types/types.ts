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