import { Either, left, right } from "../../../../core/either";
import { InvalidCredentialsError } from "../../../../core/errors/invalid-credencial-error";
import { Customer } from "../../../enterprise/entities";
import { CustomerRepository } from "../../repositories/customer-repository";
import { BcryptService } from "../../service/bcrypt/bcript-service";

interface AuthenticateServiceRequest {
  email: string
  password: string
}

type AuthenticateServiceResponse = Either<InvalidCredentialsError, { customer: Customer }>

export class Authenticate {
  constructor(
    private customerRespository: CustomerRepository,
    private bcryptService: BcryptService 
  ) {}

  authenticate = async({ email, password }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> => {
    const customer = await this.customerRespository.findByEmail(email)
    
    if(!customer) return left(new InvalidCredentialsError())
    
    const comparePasswordHash = await this.bcryptService.comparePassword(password, customer.Password as string)
        
    if(!comparePasswordHash) return left(new InvalidCredentialsError())

    return right({ customer })
  }
}