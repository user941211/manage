// app/api/materials/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const materialId = parseInt(id);

  if (isNaN(materialId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const material = await prisma.material.findUnique({
      where: { id: materialId },
    });
    if (material) {
      return NextResponse.json(material);
    } else {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch material' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const materialId = parseInt(id);

  if (isNaN(materialId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const { location, manufacturer, name, model, status, quantity } = await request.json();

    const updatedMaterial = await prisma.material.update({
      where: { id: materialId },
      data: { location, manufacturer, name, model, status, quantity },
    });
    return NextResponse.json(updatedMaterial);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update material' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const materialId = parseInt(id);

  if (isNaN(materialId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await prisma.material.delete({
      where: { id: materialId },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete material' }, { status: 500 });
  }
}
