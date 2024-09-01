import { randomUUID } from "node:crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"

export interface IPaymentProps {
    id: string
    endToEndId: string
    txid: string
    key: string
    value: string
    time: string
    createdAt: Date
    updatedAt?: Date | null
}

export class Payment extends Entity<IPaymentProps> {
    get id() {
        return this.props.id
    }

    get endToEndId() {
        return this.props.endToEndId
    }

    get txid() {
        return this.props.txid
    }

    get key() {
        return this.props.key
    }

    get value() {
        return this.props.value
    }

    get time() {
        return this.props.time
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }


    static create(props: Optional<IPaymentProps, "createdAt" | "id">) {
        const payment = new Payment({
            ...props,
            id: props.id ?? randomUUID(),
            createdAt: props.createdAt ?? new Date(),
        })

        return payment
    }
}