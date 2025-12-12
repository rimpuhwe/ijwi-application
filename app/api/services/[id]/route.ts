import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { db } = await connectToDatabase();
  const service = await db.collection('services').findOne({ _id: new ObjectId(params.id) });
  if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  return NextResponse.json(service);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase();
    const updates = await request.json();
    const result = await db.collection('services').findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: updates },
      { returnDocument: 'after' }
    );
    if (!result.value) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    return NextResponse.json(result.value);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { db } = await connectToDatabase();
  const result = await db.collection('services').deleteOne({ _id: new ObjectId(params.id) });
  if (!result.deletedCount) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  return NextResponse.json({ message: 'Service deleted successfully' });
}
}
