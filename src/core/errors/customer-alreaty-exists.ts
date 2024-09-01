import { UseCaseError } from "./use-case-error";

export class CustomerAlreadyExistsError extends Error implements UseCaseError {
    constructor() {
        super('Customer Already Exists')
    }
}
