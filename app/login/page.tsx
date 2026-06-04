"use client";
import {useState} from "react";
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
})

export default function LoginPage() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })

        if (res?.ok) {
            router.push("/");
        }
        else {
            setError("Invalid email or password");
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
                    <form onSubmit={handleLogin} className={styles.form}>
                        <h1 className={styles.title}>Welcome Back!</h1>
                        <h2 className={styles.sub}>Sign in to continue to YourMentor</h2>
                        
                        {/* OAuth login buttons */}
                        <div className={styles.oauth}>
                            <button type="button" className={styles.oauthButton}>
                                <FcGoogle className={styles.oauthGoogle} />
                                Continue with Google
                            </button>

                            <button type="button" className={styles.oauthButton}>
                                <FaLinkedin className={styles.oauthLinkedin} />
                                Continue with Linkedin
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
                        <div className={styles.passwordLabel}>
                            <label className={styles.label}>Password</label>
                            <Link href="/forgot-password" className={styles.forgot}>Forgot password?</Link>
                        </div>
                        <input 
                            className={styles.input}
                            name="password" 
                            placeholder = "Password" 
                            type="password" 
                            value={password} 
                            onChange ={(e) => setPassword(e.target.value)}
                        />

                        {/* Button field */}
                        <button type="submit" className={styles.signin}>Sign In</button>

                        {/*Sign up field */}
                        <div className={styles.centerRow}>
                            <label className={styles.noAccount}>Don't have an account? </label>
                            <Link href="/register" className={styles.signup}>Sign Up</Link>
                        </div>
                        
                    </form>
                </div>

                {/* Right side */}
                <div className={styles.right}>
                    <img src="/stock.avif" className={styles.imageCover}/>
                    <div className={styles.fade} />
                </div>
            </div>
        </div>
    );
}