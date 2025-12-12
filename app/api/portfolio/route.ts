import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  const { db } = await connectToDatabase();
  const works = await db.collection("portfolio").find({}).toArray();
  return NextResponse.json(works);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, category } = body;
    if (!title || !description || !imageUrl || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const { db } = await connectToDatabase();
    const result = await db
      .collection("portfolio")
      .insertOne({ title, description, imageUrl, category });
    return NextResponse.json(
      { _id: result.insertedId, title, description, imageUrl, category },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create portfolio work" },
      { status: 500 }
    );
  }
}
