import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        console.log("EMAIL RECEIVED:", email);
        console.log("API KEY EXISTS:", !!process.env.RESEND_API_KEY);

        const result = await resend.emails.send({
            from: "Your Mentor <onboarding@resend.dev>",
            to: email,
            subject: "Test Email",
            html: "<p>If you see this, email works</p>",
        });

        console.log("RESEND RESULT:", result);

        return Response.json({ success: true, result });

    } catch (err) {
        console.error("EMAIL ERROR:", err);
        return Response.json({ error: "failed" }, { status: 500 });
    }
}