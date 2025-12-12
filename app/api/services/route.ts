import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  const { db } = await connectToDatabase();
  const services = await db.collection("services").find({}).toArray();
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, icon, price } = body;
    if (!title || !description || !icon || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const { db } = await connectToDatabase();
    const result = await db
      .collection("services")
      .insertOne({ title, description, icon, price });
    return NextResponse.json(
      { _id: result.insertedId, title, description, icon, price },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
