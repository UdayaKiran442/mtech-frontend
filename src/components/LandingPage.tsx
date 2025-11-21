"use client"

import { useState } from "react"
import SignUp from "./SignUp"
import SignIn from "./SignIn"

export default function LandingPage() {
    const [isSignUp, setIsSignUp] = useState(true)
    return (
        <div className="flex">
            <div className="flex-1">
                Landing page UI
            </div>
            <div className="flex-1">
                {isSignUp ? <SignUp /> : <SignIn />}
            </div>
        </div>
    )
}