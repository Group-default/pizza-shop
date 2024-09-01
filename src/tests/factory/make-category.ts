import { Category, ICategoryProps } from "../../domain/enterprise/entities"

export function MakeCategory(override: Partial<ICategoryProps> = {} ) {
  const category = Category.create({
    id: "id-bebidas",
    name: "bebidas",
    ...override,
  })

  return category
}