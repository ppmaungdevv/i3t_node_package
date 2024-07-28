import { expect, test } from 'vitest'
import { ValidationError } from '../error/errors'
import { convert, convertToMany } from '../src/converter'

test('test convert func with no param', () => {
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

test('test convert func without time_string', () => {
    try {
        convert('Asia/Bangkok', 'Asia/Tokyo');
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error.message).toBe('time_string is required')
        expect(error.DESCRIPTION).toBe("convert('Continent/City', 'Continent/City', 'hh:mm a')")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('time_string is required')
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

test('test convert func with invalid time_string', () => {
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

test('test convert func with invalid date_string', () => {
    try {
        convert('Asia/Bangkok', 'Asia/Tokyo', '10:15', false);
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error.message).toBe('Invalid date format')
        expect(error.DESCRIPTION).toBe("date format must be 'yyyy-MM-dd' or 'yyyy/MM/dd'")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('Invalid date format')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})


test('test convert func with 24 hr format', () => {
    expect(convert('Asia/Bangkok', 'Asia/Tokyo', '10:15')).toMatchObject(
        {
            from :
                {
                    from_tz: 'Asia/Bangkok',
                    from_time: '10:15',
                    from_date: '2024-07-28',
                },
            to :
                {
                    to_tz: 'Asia/Tokyo',
                    to_time: '12:15',
                    to_date: '2024-07-28',
                }
        }
    )
})

test('test convert func with AM/PM format', () => {
    expect(convert('Asia/Bangkok', 'Asia/Tokyo', '10:15 PM')).toMatchObject(
        {
            from :
                {
                    from_tz: 'Asia/Bangkok',
                    from_time: '10:15 PM',
                    from_date: '2024-07-28',
                },
            to :
                {
                    to_tz: 'Asia/Tokyo',
                    to_time: '12:15 AM',
                    to_date: '2024-07-29',
                }
        }
    )
})

test('test convert func with date_string', () => {
    expect(convert('Asia/Bangkok', 'Asia/Tokyo', '10:15 PM', '2020-12-23')).toMatchObject(
        {
            from :
                {
                    from_tz: 'Asia/Bangkok',
                    from_time: '10:15 PM',
                    from_date: '2020-12-23',
                },
            to :
                {
                    to_tz: 'Asia/Tokyo',
                    to_time: '12:15 AM',
                    to_date: '2020-12-24',
                }
        }
    )
})

test('test convert func with date_string / format', () => {
    expect(convert('Asia/Bangkok', 'Asia/Tokyo', '10:15 PM', '2020/12/23')).toMatchObject(
        {
            from :
                {
                    from_tz: 'Asia/Bangkok',
                    from_time: '10:15 PM',
                    from_date: '2020/12/23',
                },
            to :
                {
                    to_tz: 'Asia/Tokyo',
                    to_time: '12:15 AM',
                    to_date: '2020/12/24',
                }
        }
    )
})

// *** test convertToMany

test('test convertToMany func with no param', () => {
    try {
        convertToMany()
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
        expect(error.message).toBe('from_tz is required')
        expect(error.DESCRIPTION).toBe("convertToMany('Continent/City', ['Continent/City', ...], 'hh:mm a')")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('from_tz is required')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

test('test convertToMany func without to_tz', () => {
    try {
        convertToMany('Africa/Abidjan')
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
        expect(error.message).toBe('to_tzs is required')
        expect(error.DESCRIPTION).toBe("convertToMany('Continent/City', ['Continent/City', ...], 'hh:mm a')")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('to_tzs is required')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

test('test convertToMany func without time_string', () => {
    try {
        convertToMany('Asia/Bangkok', ['Asia/Tokyo']);
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error.message).toBe('time_string is required')
        expect(error.DESCRIPTION).toBe("convertToMany('Continent/City', ['Continent/City', ...], 'hh:mm a')")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('time_string is required')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

test('test convertToMany func with invalid to_tz type', () => {
    try {
        convertToMany('Asia/Tokyo', 'Invalid/Timezone', '10:15')
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
        expect(error.message).toBe('Invalid type')
        expect(error.DESCRIPTION).toBe("to_tzs must be an array, ['Continent/City', ...]")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('Invalid type')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

test('test convertToMany func with invalid from_tz', () => {
    try {
        convertToMany('Invalid/Timezone', ['Asia/Tokyo'],'20:15')
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

test('test convertToMany func with invalid to_tz', () => {
    try {
        convertToMany('Asia/Tokyo', ['Invalid/Timezone', 'Asia/Japan'], '10:15')
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
        expect(error.message).toBe('Invalid time zone format')
        expect(error.DESCRIPTION).toBe("Invalid/Timezone,Asia/Japan format must be 'Continent/City'")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('Invalid time zone format')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

test('test convertToMany func with invalid time_string', () => {
    try {
        convertToMany('Asia/Bangkok', ['Asia/Tokyo', 'Asia/Yangon'], false);
        throw new Error("expected function to throw an error, but it didn't")
    } catch (error) {
        expect(error.message).toBe('Invalid time format')
        expect(error.DESCRIPTION).toBe("time format must be 'HH:mm' or 'hh:mm a'")
        expect(error.ERROR_CODE).toBe('VALIDATION_ERROR')
        expect(error.ERROR_MSG).toBe('Invalid time format')
        expect(error.ERROR_NAME).toBe('ValidationError')
    }
})

test('test convertToMany func with date_string / format', () => {
    expect(convertToMany('Asia/Bangkok', ['Asia/Tokyo', 'Asia/Yangon'], '10:15 PM', '2020/12/23')).toMatchObject(
        {
            from :
                {
                    from_tz: 'Asia/Bangkok',
                    from_time: '10:15 PM',
                    from_date: '2020/12/23',
                },
            to :
            [
                { to_date: '2020/12/24', to_time: '12:15 AM', to_tz: 'Asia/Tokyo' },
                { to_date: '2020/12/23', to_time: '09:45 PM', to_tz: 'Asia/Yangon' }
            ]
        }
    )
})