import { UseCaseError } from "./use-case-error";

export class CreatedOrderError extends Error implements UseCaseError {
    constructor() {
        super('Error creating order')
    }
}