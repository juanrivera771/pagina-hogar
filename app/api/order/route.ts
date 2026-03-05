import { NextResponse } from 'next/server'
import  db  from '@/lib/db'

export async function POST(req: Request) {
  const { id, quantity } = await req.json()

  const product = db
    .prepare('SELECT * FROM products WHERE id = ?')
    .get(id) as any

  if (!product) {
    return NextResponse.json(
      { error: 'Producto no encontrado' },
      { status: 404 }
    )
  }

  if (product.stock < quantity) {
    return NextResponse.json(
      { error: 'No hay stock suficiente' },
      { status: 400 }
    )
  }

  const newStock = product.stock - quantity

  db.prepare('UPDATE products SET stock = ? WHERE id = ?')
    .run(newStock, id)

  return NextResponse.json({
    success: true,
    product: { ...product, stock: newStock }
  })
}