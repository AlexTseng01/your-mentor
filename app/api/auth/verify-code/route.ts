import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { email, code } = await req.json();
    
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return Response.json({ error: "User not found" }, { status: 400 });
    }

    if (user.reset_code !== code) {
        return Response.json({ error: "Invalid code" }, { status: 400 });
    }

    if (!user.reset_code_expires || new Date() > user.reset_code_expires) {
        return Response.json({ error: "Code expired" }, { status: 400 });
    }

    return Response.json({ success: true });
}