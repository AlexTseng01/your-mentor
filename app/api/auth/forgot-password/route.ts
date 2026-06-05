import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.user.update({
            where: { email },
            data: {
                reset_code: code,
                reset_code_expires: new Date(Date.now() + 5 * 60 * 1000),
            },
        })

        const result = await resend.emails.send({
            from: "YourMentor <onboarding@resend.dev>",
            to: email,
            subject: "YourMentor Verification Code",
            html: `<p>Your verification code is: ${code}</p>`,
        });

        console.log("RESEND RESULT:", result);

        return Response.json({ success: true, result });

    } catch (err) {
        console.error("EMAIL ERROR:", err);
        return Response.json({ error: "failed" }, { status: 500 });
    }
}