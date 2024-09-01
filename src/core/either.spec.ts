import { Either,  left, right } from './either'

function soSomething(shouldSuccess: boolean) : Either<string, string> {
    if (shouldSuccess) {
        return right('success')
    }else {
        return left('error')
    }
    
}

describe('Either', () => {
    it('should be able return success', () => {
        const result = soSomething(true)
       
       expect(result.isRight()).toBe(true)
       expect(result.isLeft()).toBe(false) 
    })

    it('should be able return error', () => {
        const result = soSomething(false)
        expect(result.isLeft()).toBe(true)
        expect(result.isRight()).toBe(false)
    })
})    