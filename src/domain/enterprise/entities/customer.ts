import { randomUUID } from "crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"

export interface ICustomersProps {
  id: string
  name: string
  email: string
  avatarUrl?: string | null
  withdrawalName?: string | null
  phone?: string | null
  role?:'ADMIN' | 'CUSTOMER'
  password?: string | null 
  createdAt: Date
  updatedAt?: Date | null
}

export class Customer extends Entity<ICustomersProps> {

  get Id(){
    return this.props.id
  }

  get Name(){
    return this.props.name
  }

  get WithdrawalName(){
    return this.props.withdrawalName
  }

  get Email(){
    return this.props.email
  }

  get Phone(){
    return this.props.phone
  }

  get AvatarUrl(){
    return this.props.avatarUrl
  }

  get Role(){
    return this.props.role
  }

  get Password(){
    return this.props.password
  }

  get CreateAt(){
    return this.props.createdAt
  }

  get UpdatedAt(){
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  changeName(name: string) {
    this.props.name = name
    this.touch()
  }

  changeAvatarUrl(avatarUrl: string) {
    this.props.avatarUrl = avatarUrl
    this.touch()
  }

  changeWithdrawalName(withdrawalName: string) {
    this.props.withdrawalName = withdrawalName
    this.touch()
  }

  changeEmail(email: string) {
    this.props.email = email
    this.touch()
  }

  changePhone(phone: string) {
    this.props.phone = phone
    this.touch()
  }

  changeRole(role: 'ADMIN' | 'CUSTOMER') {
    this.props.role = role
    this.touch()
  }

  changePassword(password: string) {
    this.props.password = password
    this.touch()
  }

  static create(props: Optional<ICustomersProps, "createdAt"| "id">) {
    const customer = new Customer({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    })

    return customer
  }
}
