"use client"

import React, { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"

import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { H3, Tagline } from "./ui/Typography"
import { registerUserAPI } from "@/actions/user.actions"

export default function SignUp({ setIsSignUp }: { setIsSignUp: Dispatch<SetStateAction<boolean>> }) {

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    async function onSubmit(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault()
        setLoading(true);
        const registeredUser = await registerUserAPI({
            email: newUser.email,
            name: newUser.name,
            password: newUser.password,
            role: "admin"
        })
        setNewUser({
            name: "",
            email: "",
            password: ""
        })
        setCookie("token", registeredUser.response.jwtToken, {
            maxAge: 60 * 60 * 24 * 30
        })
        setLoading(false);
        if (registeredUser.success) {
            // redirect to onboarding flow page
            router.push("/onboarding-flow");
        }
        else {
            // show error message
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen py-12">
            <div className="text-center mb-8">
                <H3>Create Your Account</H3>
                <Tagline className="mt-1">Start your journey with CollabAI Enterprise</Tagline>
            </div>
            <div className="space-y-4 w-full max-w-md">
                <div>
                    <Label id="name">Full Name <span className="text-red-500">*</span></Label>
                    <Input value={newUser.name} onChange={onChange} name="name" required={true} type="text" id="name" placeholder="Enter your full name" className="mt-1 bg-gray-100" />
                </div>
                <div>
                    <Label id="email">Email <span className="text-red-500">*</span></Label>
                    <Input name="email" required={true} value={newUser.email} onChange={onChange} type="email" id="email" placeholder="Enter your Mail ID" className="mt-1 bg-gray-100" />
                </div>
                <div>
                    <Label id="password">Password <span className="text-red-500">*</span></Label>
                    <Input name="password" required={true} value={newUser.password} onChange={onChange} type="password" id="password" placeholder="Enter your password" className="mt-1 bg-gray-100" />
                </div>
                <button disabled={loading} onClick={onSubmit} className="bg-blue-600 text-white cursor-pointer py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-full mt-4">{loading ? "Creating Account.." : "Create Account"}</button>
                <p className="text-gray-700 text-center">Already have an account? <span className="text-blue-700 cursor-pointer" onClick={() => setIsSignUp(false)} >Sign In</span> </p>
            </div>
        </div>
    )
}