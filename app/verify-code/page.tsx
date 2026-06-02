"use client";
import {useState} from "react"
import Link from "next/link"
import { Roboto } from "next/font/google"
import styles from "./page.module.css"
import { useRouter } from "next/navigation"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
})

export default function VerifyCodePage() {
    const [error, setError] = useState("")
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);

    const router = useRouter()
    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault()
        const finalCode = code.join("")
        console.log(finalCode)
        router.push("/change-password")
    }

    return (
        <div className={`${roboto.className} ${styles.main}`}>

            {/* Background */}
            <div className={styles.background}/>

            {/* Main container */}
            <div className={styles.container}>

                {/* Left side */}
                <div className={styles.left}>
                    <form onSubmit={handleVerifyCode} className={styles.form}>
                        <h1 className={styles.title}>Verify Your Email</h1>
                        <h2 className={styles.sub}>Enter the verification code sent to your email</h2>
                        
                        {/* Verify code field */}
                        <div className={styles.otpRow}>
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    className={styles.otpBox}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    autoFocus={index === 0}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, "");

                                        const newCode = [...code];

                                        if (!val) {
                                        newCode[index] = "";
                                        setCode(newCode);
                                        return;
                                        }

                                        newCode[index] = val[0];
                                        setCode(newCode);

                                        if (index < 5) {
                                        const next = document.getElementById(
                                            `otp-${index + 1}`
                                        ) as HTMLInputElement | null;

                                        next?.focus();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Backspace") {
                                        const newCode = [...code];

                                        if (code[index]) {
                                            newCode[index] = "";
                                            setCode(newCode);
                                        } else if (index > 0) {
                                            const prev = document.getElementById(
                                            `otp-${index - 1}`
                                            ) as HTMLInputElement | null;

                                            prev?.focus();
                                        }

                                        setCode(newCode);
                                        }
                                    }}
                                />
                            ))}
                        </div>

                        {/* Button field */}
                        <button type="submit" className={styles.verify}>Verify</button>

                        {/* Resend code field */}
                        <div className={styles.centerRow}>
                            <label className={styles.notReceived}>Didn't receive the code? </label>
                            <Link href="#" className={styles.resend}>Resend the code</Link>
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
    )
}