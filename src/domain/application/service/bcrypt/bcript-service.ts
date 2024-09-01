export interface BcryptService {
  hashPassword(password: string, saltRounds: number): Promise<string>
  comparePassword(password: string, hashPassword: string): Promise<boolean>
}