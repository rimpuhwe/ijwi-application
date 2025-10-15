import { NextResponse } from "next/server"
import { getPortfolioWorkById, updatePortfolioWork, deletePortfolioWork } from "@/lib/portfolio-data"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const work = getPortfolioWorkById(id)

  if (!work) {
    return NextResponse.json({ error: "Portfolio work not found" }, { status: 404 })
  }

  return NextResponse.json(work)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const updatedWork = updatePortfolioWork(id, body)

    if (!updatedWork) {
      return NextResponse.json({ error: "Portfolio work not found" }, { status: 404 })
    }

    return NextResponse.json(updatedWork)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update portfolio work" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const deleted = deletePortfolioWork(id)

  if (!deleted) {
    return NextResponse.json({ error: "Portfolio work not found" }, { status: 404 })
  }

  return NextResponse.json({ message: "Portfolio work deleted successfully" })
}
