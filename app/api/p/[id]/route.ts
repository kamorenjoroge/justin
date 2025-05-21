//api/p/[id]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Test from '../../../../models/Test';

// GET /api/p/[id] - Get a single Test
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const test = await Test.findById(params.id);
    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }
    return NextResponse.json(test);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch test' }, { status: 500 });
  }
}

// PUT /api/p/[id] - Update a Test
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await req.json();
    const updatedTest = await Test.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTest) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }
    return NextResponse.json(updatedTest);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update test' }, { status: 500 });
  }
}

// DELETE /api/p/[id] - Delete a Test
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const deletedTest = await Test.findByIdAndDelete(params.id);
    if (!deletedTest) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete test' }, { status: 500 });
  }
}
