
"use client";
import {useState} from "react"
import Link from "next/link"
import { Roboto } from "next/font/google"
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
})

export default function LoginPage() {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    
    const loginHandle = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        if (!res.ok) {
            setError("Failed to login.")
            return
        }

        window.location.href = "/"
    }

    return (
        <div className={`${roboto.className} relative min-h-screen flex items-center justify-center`}>

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-[#1c1c1c]"/>

            {/* Main container */}
            <div className="relative flex w-[70vw] h-[90vh] shadow-2xl rounded-2xl overflow-hidden bg-[#090909]">

                {/* Left side */}
                <div className="w-1/2 flex items-center justify-center">
                    <form onSubmit={loginHandle} className="w-full max-w-sm space-y-4">
                        <h1 className="text-2xl font-bold">Welcome to YourMentor!</h1>
                        <h2 className="text-sm text-gray-400 font-light">Log in to continue to YourMentor.</h2>
                        
                        {/* OAuth login buttons */}
                        <div className="space-y-2 mt-2">
                            <button type="button" className="w-full flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-white p-2 transition">
                                <FcGoogle className="text-xl" />
                                Continue with Google
                            </button>

                            <button type="button" className="w-full flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-white p-2 transition">
                                <FaLinkedin className="text-[#0A66C2] text-lg" />
                                Continue with Linkedin
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-3">
                            <div className="h-px flex-1 bg-white/10" />
                                <span className="text-xs text-gray-500">OR</span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        {/* Email field */}
                        <label className="text-sm text-white mb-1 block">Email</label>
                        <input 
                            className="rounded-md w-full border p-2 w-full rounded-md border border-white/10 bg-white/500 p-2 text-white
             focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30
             transition" 
                            name="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        {/* Password field */}
                        <div className="flex items-center justify-between mb-1">
                            <label className="text-sm text-white mb-1 block">Password</label>
                            <Link href="#" className="text-sm text-gray-400 font-light hover:text-white hover:underline transition">Forgot password?</Link>
                        </div>
                        <input 
                            className="rounded-md w-full border p-2 w-full rounded-md border border-white/10 bg-white/500 p-2 text-white
             focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30
             transition" 
                            name="password" 
                            placeholder = "Password" 
                            type="password" 
                            value={password} 
                            onChange ={(e) => setPassword(e.target.value)}
                        />

                        {/* Button field */}
                        <button type="submit" className="rounded-md w-full bg-white/10 hover:bg-white/20 text-white p-2 transition">Sign in</button>

                        {/*Sign up field */}
                        <div className="text-gray-400 flex items-center justify-center gap-1 mb-1">
                            <label className="text-sm mb-1 block">Don't have an account? </label>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white hover:underline transition mb-1">Sign up</Link>
                        </div>
                        
                    </form>
                </div>

                {/* Right side */}
                <div className="w-1/2 relative overflow-hidden">
                    <img src="/stock.avif"className="absolute inset-0 w-full h-full object-cover"/>
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#090909] to-transparent" />
                </div>
            </div>
        </div>
    )
}