// app/api/materials/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

const materialSchema = z.object({
  location: z.string().min(1),
  manufacturer: z.string().min(1),
  name: z.string().min(1),
  model: z.string().min(1),
  status: z.string().min(1),
  quantity: z.number().int().nonnegative(),
});

export async function GET() {
  try {
    const materials = await prisma.material.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(materials);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch materials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = materialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const { location, manufacturer, name, model, status, quantity } = parsed.data;

    const newMaterial = await prisma.material.create({
      data: {
        location,
        manufacturer,
        name,
        model,
        status,
        quantity,
      },
    });
    return NextResponse.json(newMaterial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create material' }, { status: 500 });
  }
}
