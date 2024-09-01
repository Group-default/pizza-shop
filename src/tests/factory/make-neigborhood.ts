import { Neighborhood, INeighborhoodProps } from "../../domain/enterprise/entities";

export function makeNeighborhood(override: Partial<INeighborhoodProps> = {}) {
  const address = Neighborhood.create({
    name: "Cordeiros",
    tax: "7.00",
    ...override,
  })

  return address
}