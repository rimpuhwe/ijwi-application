import { NextResponse } from "next/server"
import { getServices, createService } from "@/lib/services-data"

export async function GET() {
  const services = getServices()
  return NextResponse.json(services)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, icon, price } = body

    if (!title || !description || !icon || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newService = createService({ title, description, icon, price })
    return NextResponse.json(newService, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
