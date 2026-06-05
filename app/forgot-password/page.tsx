"use client";
import {useState} from "react";
import { Roboto } from "next/font/google";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
})

export default function ForgotPasswordPage() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");

    const router = useRouter();
    
    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        
        router.push(`/verify-code?email=${email}`);
    }

    return (
        <div className={`${roboto.className} ${styles.main}`}>

            {/* Background */}
            <div className={styles.background}/>

            {/* Main container */}
            <div className={styles.container}>

                {/* Left side */}
                <div className={styles.left}>
                    <form onSubmit={handleForgotPassword} className={styles.form}>
                        <h1 className={styles.title}>Forgot Password?</h1>
                        <h2 className={styles.sub}>Enter your email to reset your password</h2>

                        {/* Email field */}
                        <input 
                            type="email"
                            required
                            className={styles.input}
                            name="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        {/* Button field */}
                        <button type="submit" className={styles.next}>Next</button>
                        
                    </form>
                </div>

                {/* Right side */}
                <div className={styles.right}>
                    <img src="/forgor.jpg" className={styles.imageCover}/>
                    <div className={styles.fade} />
                </div>
            </div>
        </div>
    );
}