"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { setCookie } from 'cookies-next'
import { redirect } from "next/navigation"


import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { H3, Tagline } from "./ui/Typography"
import { loginUserAPI } from "@/actions/user.actions"
import { getAuthenticatedUser } from "@/lib/user"

export default function SignIn({ setIsSignUp }: { setIsSignUp: Dispatch<SetStateAction<boolean>> }) {

    const [userLoginDetails, setUserLoginDetails] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);


    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserLoginDetails({ ...userLoginDetails, [e.target.name]: e.target.value })
    }

    async function onSubmit(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault()
        setLoading(true)
        const loginUser = await loginUserAPI({
            email: userLoginDetails.email,
            password: userLoginDetails.password
        })

        if (loginUser.success) {
            setCookie("token", loginUser.token, {
                maxAge: 60 * 60 * 24 * 30
            })
            // add user to redux store
            
            // redirect to home page
            const { isAuthenticated, userProfile } = await getAuthenticatedUser();
            if (isAuthenticated && userProfile) {
                redirect(`/workspace/${userProfile.workspace.workspaceId}`);
            }
        }
        else {
            if (loginUser.error === "Invalid credentials") {
                alert("Invalid email or password. Please try again.")
                setLoading(false)
                return
            }
            alert("Something went wrong while logging in. Please try again later.")
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col items-center min-h-screen py-12">
            <div className="text-center mb-8">
                <H3>Login into your Account</H3>
                <Tagline className="mt-1">Start your journey with CollabAI Enterprise</Tagline>
            </div>
            <div className="space-y-4 w-full max-w-md">
                <div>
                    <Label id="email">Email <span className="text-red-500">*</span></Label>
                    <Input name="email" required={true} value={userLoginDetails.email} onChange={onChange} type="email" id="email" placeholder="Enter your Mail ID" className="mt-1 bg-gray-100" />
                </div>
                <div>
                    <Label id="password">Password <span className="text-red-500">*</span></Label>
                    <Input name="password" required={true} value={userLoginDetails.password} onChange={onChange} type="password" id="password" placeholder="Enter your password" className="mt-1 bg-gray-100" />
                </div>
                <button disabled={loading} onClick={onSubmit} className="bg-blue-600 text-white cursor-pointer py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-full mt-4">{loading ? "Logging in..." : "Log In"}</button>
                <p className="text-gray-700 text-center">Donot have an account? <span className="text-blue-700 cursor-pointer" onClick={() => setIsSignUp(true)} >Sign Up</span> </p>
            </div>
        </div>
    )
}