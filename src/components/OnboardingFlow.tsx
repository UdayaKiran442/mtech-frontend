"use client"

import { useState } from "react";
import { redirect, useRouter } from "next/navigation"

import Asterik from "./ui/Asterik";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { H4, Tagline } from "./ui/Typography";
import { ICreateOrganisationPayload } from "@/types/types";
import { getToken } from "@/lib/token";
import { createOrganisationAPI } from "@/actions/organisation.actions";
import { createWorkspaceAPI } from "@/actions/workspace.actions";

export default function OnboardingFlow() {
    const [newOrganisation, setNewOrganisation] = useState<ICreateOrganisationPayload>({
        orgName: '',
        orgSize: '',
        industry: '',
    })

    const router = useRouter();

    const [newWorkspace, setNewWorkspace] = useState({
        workspaceUrl: '',
        workspaceName: '',
    })

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewOrganisation({ ...newOrganisation, [e.target.name]: e.target.value })
        if (e.target.name === 'workspaceUrl') {
            setNewWorkspace({ ...newWorkspace, [e.target.name]: e.target.value })
        }
    }

    async function onSubmit() {
        const token = await getToken()
        const newOrganisationResponse = await createOrganisationAPI(newOrganisation, token)
        if (newOrganisationResponse.success) {
            // call create workspace api
            const newWorkspaceResponse = await createWorkspaceAPI({
                organisationId: newOrganisationResponse.organisation.organisationId,
                workspaceName: newWorkspace.workspaceName,
                workspaceUrl: newWorkspace.workspaceUrl
            }, token)
            if (newWorkspaceResponse.success) {
                // redirect to workspace
                router.push(`/workspace/${newWorkspaceResponse.workspace.workspaceId}`)

            }

        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mt-8">
                <H4>Set up Your Organisation</H4>
                <Tagline>Let's start by creating your workspace and setting up your organisation</Tagline>
            </div>
            <div className="space-y-6 mt-5">
                <div className="space-y-2">
                    <Label id="orgName">Organisation Name <Asterik /> </Label>
                    <Input value={newOrganisation.orgName} onChange={onChange} id="orgName" name="orgName" placeholder="Enter your organisation name" required type="text" />
                </div>

                <div className="space-y-2">
                    <Label id="orgSize">Organisation Size <Asterik /> </Label>
                    <Input value={newOrganisation.orgSize} onChange={onChange} id="orgSize" name="orgSize" placeholder="Enter your organisation Size" required type="text" />
                </div>

                <div className="space-y-2">
                    <Label id="industry">Industry <Asterik /> </Label>
                    <Input value={newOrganisation.industry} onChange={onChange} id="industry" name="industry" placeholder="Enter your Industry" required type="text" />
                </div>

                <div className="space-y-2">
                    <Label id="workspaceName">Workspace Name <Asterik /> </Label>
                    <Input value={newWorkspace.workspaceName} onChange={onChange} id="workspaceName" name="workspaceName" placeholder="Enter your workspace name" required type="text" />
                </div>

                <div className="space-y-2">
                    <Label id="workspaceUrl">Workspace Url <Asterik /> </Label>
                    <Input value={newWorkspace.workspaceUrl} onChange={onChange} id="workspaceUrl" name="workspaceUrl" placeholder="Enter your workspace url" required type="text" />
                </div>

                <div className="space-y-2">
                    <button onClick={onSubmit} className="bg-blue-600 text-white cursor-pointer py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-full mt-4">Create Workspace</button>
                </div>
            </div>

        </div>
    )
}