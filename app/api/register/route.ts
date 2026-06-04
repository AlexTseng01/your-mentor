export const runtime = "nodejs"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    const { email, password } = await req.json()

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    })

    return Response.json({
        success: true,
        user: {
            id: user.id,
            email: user.email,
        }
    })
}