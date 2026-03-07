import { NextResponse } from 'next/server'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const products = db
      .prepare(
        'SELECT id,name,price,stock,img,category,description FROM products'
      )
      .all()

    return NextResponse.json(products)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Error obteniendo productos' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
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

    db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?')
      .run(quantity, id)

    const updatedProduct = db
      .prepare('SELECT * FROM products WHERE id = ?')
      .get(id)

    return NextResponse.json({
      message: 'Stock actualizado',
      product: updatedProduct,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Error actualizando stock' },
      { status: 500 }
    )
  }
}