import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { getSession } from "@/lib/session";

export async function GET() {
  return NextResponse.json(db.getProducts());
}

export async function POST(req: Request) {
  const data = await req.json();
    const session = await getSession();
  if (!session || session.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }
  const product = db.addProduct({
    id: uuidv4(),
    name: data.name,
    description: data.description,
    price: Number(data.price),
    image: data.image || "",
    stock: Number(data.stock),
  });
  return NextResponse.json(product);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const updated = db.updateProduct(data.id, data);
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  db.deleteProduct(id);
  return NextResponse.json({ success: true });
}
