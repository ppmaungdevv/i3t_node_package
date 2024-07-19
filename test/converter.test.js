import { expect, test } from 'vitest'
import { ValidationError } from '../error/errors'
import { convert } from '../src/converter'

test('test Tz validation func with no param', () => {

    try {
        convert()
    } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
        expect(error.message).toBe('from_tz is required')
        expect(error.DESCRIPTION).toBe("convert('Continent/City', 'Continent/City')")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('from_tz is required')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
    
})

test('test convert func with invalid from_tz', () => {

    try {
        convert('Invalid/Timezone')
    } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
        expect(error.message).toBe('Invalid time zone format')
        expect(error.DESCRIPTION).toBe("time zone format must be 'Continent/City'")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('Invalid time zone format')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }

})

test('test convert func with valid from_tz without to_tz', () => {
    
    try {
        convert('Africa/Abidjan')
    } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
        expect(error.message).toBe('to_tz is required')
        expect(error.DESCRIPTION).toBe("convert('Continent/City', 'Continent/City')")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('to_tz is required')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

test('test convert func with valid from_tz with invalid to_tz', () => {

    try {
        convert('Invalid/Timezone')
    } catch (error) {
        expect(error.message).toBe('Invalid time zone format')
        expect(error.DESCRIPTION).toBe("time zone format must be 'Continent/City'")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('Invalid time zone format')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

test('test convert func with valid from_tz & to_tz', () => {
    expect(convert('Asia/Bangkok', 'Asia/Tokyo')).toBe('Success')
})