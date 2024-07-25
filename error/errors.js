export class ValidationError extends Error {
    constructor(message, description) {
        super(message)
        this.DESCRIPTION = description
        this.ERROR_CODE = 'VALIDATION_ERROR'
        this.ERROR_MSG = message
        this.ERROR_NAME = 'ValidationError'
    }
}