// app/api/auth/verify/route.ts
import { NextResponse } from 'next/server'
import { descrypt } from "@/lib/sessions"
import prisma from '@/lib/PrismClient'

export async function GET(request: Request) {
  const cookies = request.headers.get('Cookie')
  const authCookie = cookies?.split('desh_aurth_cookie=')[1]?.split(';')[0]

  if (!authCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const payload = await descrypt(authCookie)
    if (!payload?.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await prisma.users.findFirst({ 
      where: { id: payload.userId },
      select: {
        id: true,
        username:true,
        email: true,
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}