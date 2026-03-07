import fs from "fs"
import path from "path"
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import csv from "csv-parser"

async function importProducts() {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT,
      price REAL,
      stock INTEGER,
      img TEXT,
      category TEXT,
      tag TEXT,
      description TEXT
    )
  `)

  const results: any[] = []

  const filePath = path.join(process.cwd(), "products.csv")

  fs.createReadStream(filePath)
    .pipe(csv({ separator: ";" }))   // ← IMPORTANTE
    .on("data", (data) => results.push(data))
    .on("end", async () => {

      for (const product of results) {

        await db.run(
          `INSERT INTO products 
          (id,name,price,stock,img,category,tag,description)
          VALUES (?,?,?,?,?,?,?,?)`,
          product.id,
          product.name,
          product.price,
          product.stock,
          product.img,
          product.category,
          product.tag,
          product.description
        )

      }

      console.log("✅ Productos importados correctamente")
      process.exit()
    })
}

importProducts()