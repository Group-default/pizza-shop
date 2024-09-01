import { randomUUID } from "crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"


export interface IAddressProps {
    id: string
    customerId: string
    type: "HOME" | "WORK" | "OTHER"
    street: string
    standard?: boolean,
    number: string
    neighborhoodId: string
    zipCode: string
    phone: string
    createdAt: Date
    updatedAt?: Date | null
}

export class Address extends Entity<IAddressProps> {
    
    get id(){
        return this.props.id
    }

    get customerId(){
        return this.props.customerId
    }

    get type(){
        return this.props.type
    }

    get street(){
        return this.props.street
    }

    get standard(){
        return this.props.standard
    }

    get number(){
        return this.props.number
    }

    get neighborhoodId(){
        return this.props.neighborhoodId
    }

    get zipCode(){
        return this.props.zipCode
    }

    get phone(){
        return this.props.phone
    }

    get createdAt(){
        return this.props.createdAt
    }

    get updatedAt(){
        return this.props.updatedAt
    }

    private touch(){
        this.props.updatedAt = new Date()
    }

    changeStreet(street: string){
        this.props.street = street
        this.touch()
    }

    changeStandard(standard: boolean){
        this.props.standard = standard
        this.touch()
    }

    changeNumber(number: string){
        this.props.number = number
        this.touch()
    }

    changeType(type: 'HOME' | 'WORK' | 'OTHER'){
        this.props.type = type
        this.touch()
    }



    changeZipCode(zipCode: string){
        this.props.zipCode = zipCode
        this.touch()
    }

    changePhone(phone: string){
        this.props.phone = phone
        this.touch()
    }

    static create(props: Optional<IAddressProps, "createdAt" | "id">) {
        const address = new Address({
            ...props,
            id: props.id ?? randomUUID(),
            createdAt: props.createdAt ?? new Date(),
        })

        return address
    }
}