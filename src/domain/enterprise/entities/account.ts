import { randomUUID } from "crypto";
import { Entity } from "../../../core/entities/entity";
import { Optional } from "../../../core/types/optional";

export interface IAccountProps {
  id: string
  provider: "GOOGLE" | "GITHUB"
  providerAccountId: string
  customerId: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Account extends Entity<IAccountProps> {
  get id() {
    return this.props.id
  }

  get provider() {
    return this.props.provider
  }

  get providerAccountId() {
    return this.props.providerAccountId
  }

  get customerId() {
    return this.props.customerId
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

  changeProvider(provider: "GOOGLE" | "GITHUB") {
    this.props.provider = provider
    this.touch()
  }



  static create(props: Optional<IAccountProps, "createdAt" | "id">) {
    const category = new Account({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    })

    return category
  }
} 