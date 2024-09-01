import { compare, hash } from 'bcryptjs';
import { BcryptService } from '../../../domain/application/service/bcrypt/bcript-service';

export class BcryptServiceImpl implements BcryptService {
    async hashPassword(password: string, saltRounds: number): Promise<string> {
        return await hash(password, saltRounds)
    }
    
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        const compareHash = await compare(password, hashedPassword)
        return compareHash
    }
}