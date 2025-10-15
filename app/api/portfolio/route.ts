import { NextResponse } from "next/server"
import { getPortfolioWorks, createPortfolioWork } from "@/lib/portfolio-data"

export async function GET() {
  const works = getPortfolioWorks()
  return NextResponse.json(works)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, imageUrl, category } = body

    if (!title || !description || !imageUrl || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newWork = createPortfolioWork({ title, description, imageUrl, category })
    return NextResponse.json(newWork, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create portfolio work" }, { status: 500 })
  }
}
