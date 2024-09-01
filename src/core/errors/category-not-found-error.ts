import { UseCaseError } from "./use-case-error";

export class CategoryNotFoundError extends Error implements UseCaseError {
    constructor() {
        super('Category not found')
    }
}