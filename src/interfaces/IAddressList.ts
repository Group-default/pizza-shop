interface Neighborhood {
  id: string;
  name: string;
  tax: string;
}

export interface IAddressList {
  id: string
  type: "HOME" | "WORK" | "OTHER"
  number: string
  phone: string
  standard: boolean
  street: string
  zipCode: string
  neighborhood: Neighborhood;
}






