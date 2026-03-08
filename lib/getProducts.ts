import fs from "fs"
import path from "path"

export type Product = {
  id: string
  name: string
  price: number
  stock: number
  img: string
  category: string
  tag: string
  description: string
  slug: string
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function getProducts(): Product[] {

  const filePath = path.join(process.cwd(), "products.csv")

  const file = fs.readFileSync(filePath, "utf8")

  const lines = file
    .replace(/\r/g, "")     // 🔴 ESTA LÍNEA ARREGLA EL CSV
    .split("\n")
    .slice(1)

  return lines
    .filter(Boolean)
    .map((line) => {

      const [
        id,
        name,
        price,
        stock,
        img,
        category,
        tag,
        description
      ] = line.split(";")

      const cleanName = name.trim()

      return {
        id: id.trim(),
        name: cleanName,
        price: Number(price),
        stock: Number(stock),
        img: img.trim(),
        category: category.trim(),
        tag: tag?.trim() || "",
        description: description?.trim() || "",
        slug: generateSlug(cleanName)
      }
    })
}