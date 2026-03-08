'use client'

import Image from 'next/image'

export default function ProductClient({ product }: any) {

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

      <div className="relative aspect-square">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>

        <p className="text-2xl font-semibold">
          ${product.price}
        </p>

        <p className="text-slate-600">
          {product.description}
        </p>

        <button
          className="bg-black text-white px-6 py-3 rounded-full"
        >
          Agregar al carrito
        </button>

      </div>

    </div>
  )
}