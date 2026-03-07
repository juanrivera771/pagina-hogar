import fs from "fs";
import path from "path";

export type Product = {
  id: string;
  name: string;
  price: string;
  stock: string;
  img: string;
  category: string;
  tag: string;
  description: string;
};

export function getProducts(): Product[] {
  const filePath = path.join(process.cwd(), "products.csv");

  const file = fs.readFileSync(filePath, "utf8");

  const lines = file.split("\n").slice(1);

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
        description,
      ] = line.split(";"); // 👈 cambiar coma por ;

      return {
        id,
        name,
        price,
        stock,
        img,
        category,
        tag,
        description,
      };
    });
}