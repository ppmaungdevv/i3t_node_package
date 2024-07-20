import { expect, test } from 'vitest'
import { ValidationError } from '../error/errors'
import { convert } from '../src/converter'

test('test Tz validation func with no param', () => {
    try {
        convert()
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
        expect(error.message).toBe('from_tz is required')
        expect(error.DESCRIPTION).toBe("convert('Continent/City', 'Continent/City', 'hh:mm a')")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('from_tz is required')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

test('test convert func without to_tz', () => {
    try {
        convert('Africa/Abidjan')
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
        expect(error.message).toBe('to_tz is required')
        expect(error.DESCRIPTION).toBe("convert('Continent/City', 'Continent/City', 'hh:mm a')")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('to_tz is required')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

test('test convert func without timestring', () => {
    try {
        convert('Asia/Bangkok', 'Asia/Tokyo');
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error.message).toBe('timestring is required')
        expect(error.DESCRIPTION).toBe("convert('Continent/City', 'Continent/City', 'hh:mm a')")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('timestring is required')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

test('test convert func with invalid from_tz', () => {
    try {
        convert('Invalid/Timezone', 'Asia/Tokyo','20:15')
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
        expect(error.message).toBe('Invalid time zone format')
        expect(error.DESCRIPTION).toBe("time zone format must be 'Continent/City'")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('Invalid time zone format')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

test('test convert func with invalid to_tz', () => {
    try {
        convert('Asia/Tokyo', 'Invalid/Timezone', '10:15')
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
        expect(error.message).toBe('Invalid time zone format')
        expect(error.DESCRIPTION).toBe("time zone format must be 'Continent/City'")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('Invalid time zone format')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

test('test convert func with invalid time', () => {
    try {
        convert('Asia/Bangkok', 'Asia/Tokyo', false);
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error.message).toBe('Invalid time format')
        expect(error.DESCRIPTION).toBe("time format must be 'HH:mm' or 'hh:mm a'")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('Invalid time format')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

