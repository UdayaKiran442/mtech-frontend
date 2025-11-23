"use client"

import { Dispatch, SetStateAction } from "react"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { H3, Tagline } from "./ui/Typography"

export default function SignUp({ setIsSignUp }: { setIsSignUp: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className="flex flex-col items-center min-h-screen py-12">
            <div className="text-center mb-8">
                <H3>Create Your Account</H3>
                <Tagline className="mt-1">Start your journey with CollabAI Enterprise</Tagline>
            </div>
            <div className="space-y-4 w-full max-w-md">
                <div>
                    <Label id="fullName">Full Name <span className="text-red-500">*</span></Label>
                    <Input name="fullName" required={true} type="text" id="fullName" placeholder="Enter your full name" className="mt-1 bg-gray-100" />
                </div>
                <div>
                    <Label id="email">Email <span className="text-red-500">*</span></Label>
                    <Input name="email" required={true} type="email" id="email" placeholder="Enter your Mail ID" className="mt-1 bg-gray-100" />
                </div>
                <div>
                    <Label id="password">Password <span className="text-red-500">*</span></Label>
                    <Input name="password" required={true} type="password" id="password" placeholder="Enter your password" className="mt-1 bg-gray-100" />
                </div>
                <button className="bg-blue-600 text-white cursor-pointer py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-full mt-4">Create Account</button>
                <p className="text-gray-700 text-center">Already have an account? <span className="text-blue-700 cursor-pointer" onClick={() => setIsSignUp(false)} >Sign In</span> </p>
            </div>
        </div>
    )
}