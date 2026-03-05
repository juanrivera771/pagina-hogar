import { NextResponse } from 'next/server'
import db from '@/lib/db'

// GET → traer productos desde la DB
export async function GET() {
  const products = db.prepare('SELECT * FROM products').all()
  return NextResponse.json(products)
}

// POST → descontar stock
export async function POST(request: Request) {
  const { id, quantity } = await request.json()

  const product = db
    .prepare('SELECT * FROM products WHERE id = ?')
    .get(id) as {
      id: string
      name: string
      price: number
      stock: number
      img: string
      category: string
      tag: string
      description: string
    } | undefined

  if (!product) {
    return NextResponse.json(
      { error: 'Producto no encontrado' },
      { status: 404 }
    )
  }

  if (product.stock < quantity) {
    return NextResponse.json(
      { error: 'Stock insuficiente' },
      { status: 400 }
    )
  }

  // Actualizar stock
  db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?')
    .run(quantity, id)

  const updatedProduct = db
    .prepare('SELECT * FROM products WHERE id = ?')
    .get(id)

  return NextResponse.json({
    message: 'Stock actualizado',
    product: updatedProduct
  })
}