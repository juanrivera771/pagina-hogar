import fs from "fs";
import path from "path";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  img: string;
  category: string;
  stock: string;
};

export function getProducts(): Product[] {
  const filePath = path.join(process.cwd(), "products.csv");

  const file = fs.readFileSync(filePath, "utf8");

  const lines = file.split("\n").slice(1);

  return lines
    .filter(Boolean)
    .map((line) => {
      const [id, name, description, price, img, category, stock] =
        line.split(",");

      return {
        id,
        name,
        description,
        price,
        img,
        category,
        stock,
      };
    });
}