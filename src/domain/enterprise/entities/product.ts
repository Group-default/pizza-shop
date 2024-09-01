import { randomUUID } from "node:crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"

export interface IProductProps {
    id: string
    categoryId: string
    name: string
    type?: string | null
    size?: string | null
    imageUrl: string
    description: string
    price: string
    status?: "ACTIVE" | "DISABLE"
    createdAt: Date
    updatedAt?: Date | null
}

export class Product extends Entity<IProductProps> {
    get id() {
        return this.props.id
    }

    get categoryId() {
        return this.props.categoryId
    }

    get name() {
        return this.props.name
    }

    get imageUrl() {
        return this.props.imageUrl
    }


    get description() {
        return this.props.description
    }

    get type() {
        return this.props.type
    }

    get size() {
        return this.props.size
    }

    get price() {
        return this.props.price
    }

    get status() {
        return this.props.status
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



    changeDescription(description: string) {
        this.props.description = description
        this.touch()
    }

    changeSize(size: string) {
        this.props.size = size
        this.touch()
    }

    changeImageUrl(imageUrl: string) {
        this.props.imageUrl = imageUrl
        this.touch()
    }

    changeType(type: string) {
        this.props.type = type
        this.touch()
    }

    changeStatus(status: "ACTIVE" | "DISABLE") {
        this.props.status = status
        this.touch()
    }

    changePrice(price: string) {
        this.props.price = price
        this.touch()
    }

    static create(props: Optional<IProductProps, "createdAt" | "id">) {
        const product = new Product({
            ...props,
            id: props.id ?? randomUUID(),
            createdAt: props.createdAt ?? new Date(),
        })

        return product
    }
}