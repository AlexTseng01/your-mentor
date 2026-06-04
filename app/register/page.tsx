// npx prisma migrate dev --name init --> THIS CREATES THE INITIAL SCHEMA
// npx prisma migrate dev --name add_username --> THIS UPDATES THE CURRENT SCHEMA
"use client";
import { useState } from "react";
import { Roboto } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RegisterPage() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const router = useRouter();
    
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password }),
        })

        if (!res.ok) {
            setError("Failed to sign up");
            return;
        }

        const loginRes = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })

        if (loginRes?.ok) {
            router.push("/");
        }
        else {
            setError("Account has been created, but login failed");
        }
    }

    return (
        <div className={`${roboto.className} ${styles.main}`}>

            {/* Background */}
            <div className={styles.background}/>

            {/* Main container */}
            <div className={styles.container}>

                {/* Left side */}
                <div className={styles.left}>
                    <form onSubmit={handleRegister} className={styles.form}>
                        <h1 className={styles.welcome}>Welcome to YourMentor!</h1>
                        <h2 className={styles.continue}>Sign up to YourMentor to continue</h2>
                        
                        {/* OAuth login buttons */}
                        <div className={styles.oauth}>
                            <button type="button" className={styles.oauthButton}>
                                <FcGoogle className={styles.oauthGoogle} />
                                Sign up with Google
                            </button>

                            <button type="button" className={styles.oauthButton}>
                                <FaLinkedin className={styles.oauthLinkedin} />
                                Sign up with Linkedin
                            </button>
                        </div>

                        {/* Divider */}
                        <div className={styles.dividerRow}>
                            <div className={styles.line} />
                                <span className={styles.or}>OR</span>
                            <div className={styles.line} />
                        </div>

                        {/* Email field */}
                        <label className={styles.label}>Email</label>
                        <input 
                            type="email"
                            required
                            className={styles.input}
                            name="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        {/* Password field */}
                        <label className={styles.label}>Password</label>
                        <input 
                            className={styles.input}
                            name="password" 
                            placeholder = "Password" 
                            type="password" 
                            value={password} 
                            onChange ={(e) => setPassword(e.target.value)}
                        />

                        {/* Button field */}
                        <button type="submit" className={styles.signup}>Sign Up</button>
                        
                    </form>
                </div>

                {/* Right side */}
                <div className={styles.right}>
                    <img src="/virtual.jpg" className={styles.imageCover}/>
                    <div className={styles.fade} />
                </div>
            </div>
        </div>
    );
}