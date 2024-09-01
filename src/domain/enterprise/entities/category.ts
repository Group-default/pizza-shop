import { randomUUID } from "crypto";
import { Entity } from "../../../core/entities/entity";
import { Optional } from "../../../core/types/optional";

export interface ICategoryProps {
  id: string
  name: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Category extends Entity<ICategoryProps> {
  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  changeName(name: string) {
    this.props.name = name
    this.touch()
  }

  static create(props: Optional<ICategoryProps, "createdAt" | "id">) {
    const category = new Category({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    })

    return category
  }
} 