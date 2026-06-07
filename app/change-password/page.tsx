"use client";
import {useState} from "react"
import { Roboto } from "next/font/google"
import styles from "./page.module.css"
import { useRouter } from "next/navigation";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
})

export default function ChangePasswordPage() {
    const [error, setError] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const router = useRouter()

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const res = await fetch("/api/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword }),
        }) 

        if (res.ok) {
            router.push("/login")
        }
        else {
            setError("Failed to change password");
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
                    <form onSubmit={handleChangePassword} className={styles.form}>
                        <h1 className={styles.title}>Change Your Password</h1>
                    
                        {/* New password field */}
                        <input 
                            className={styles.input}
                            name="password" 
                            placeholder="New password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        
                        {/* Confirm new password field */}
                        <input 
                            className={styles.input}
                            name="password" 
                            placeholder = "Confirm password" 
                            type="password" 
                            value={confirmPassword} 
                            onChange ={(e) => setConfirmPassword(e.target.value)}
                        />

                        {/* Button field */}
                        <button type="submit" className={styles.changePassword}>Change Password</button>
                        
                    </form>
                </div>

                {/* Right side */}
                <div className={styles.right}>
                    <img src="/stock.avif" className={styles.imageCover}/>
                    <div className={styles.fade} />
                </div>
            </div>
        </div>
    )
}