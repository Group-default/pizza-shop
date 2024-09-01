export interface IOrderList {
  methodDelivery: "DELIVERY" | "PICKUP"
  status: string
  payment: "CARD" | "MONEY" | "PIX",
  id: string
  createdAt: Date
  totalPrice: string
  customer: {
    name: string
    email: string
    phone: string
    address: {
      id: string
      street: string
      number: string
      type: string
      neighborhood: { name: string, tax: string }
      zipCode: string
      phone: string
    }[],
  }
  itensOrder: {
    mode: "MIXED" | "SIMPLE",
    price: string
    product: string[]
    quantity: number
    size: "ENTIRE" | "HALF"
  }[]
}

export interface OrderData {
  orderId: string;
  customerId: string;
  status: string;
  methodDelivery: string;
  payment: string;
  observation?: string;
  totalPrice: string;
  itensOrder: any; // Defina o tipo apropriado para "itensOrder"
  orderCreatedAt: Date;
  customer: {
    customerId: string;
    withdrawalName: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: {
      addressId: string;
      addressNumber: string;
      addressPhone: string;
      addressStreet: string;
      addressType: string;
      addressZipCode: string;
      neighborhood: {
        neighborhoodName: string;
        neighborhoodTax: string;
      };
    };
  };
}

export interface IOrderUpdate {
  id:string
  status: 'WAITING' | 'ACCEPTED' | 'AWAITING_WITHDRAWAL' | 'PREPARING' | 'DELIVERY' | 'CANCELED' | 'FINISHED'
}