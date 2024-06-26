import { expect, test } from 'vitest'
import { convert } from './src/converter.js'


let from_tz = "jp", to_tz = "mm"

test('test without opt params', () => {
    expect(() => convert()).toThrowError('Invalid')
})

test('test with opt null param', () => {
    expect(() => convert(null)).toThrowError('Invalid')
})

test('test with opt is not an object', () => {
    expect(() => convert("jp")).toThrowError('Invalid')
})

test('test with opt is an empty object', () => {
    expect(() => convert({})).toThrowError('Invalid')
})

// test('validator test', () => {
//     expect(() => convert({})).toThrowError('Invalid')
// })

const complete_op = { from_tz: 'America/Los_Angeles', from_time: null, to_tz: 'Japan', to_time: null },
no_ftz_op = { from_time: null, to_tz: 'mm', to_time: null },
null_ftz_op = { from_tz: null, from_time: null, to_tz: 'mm', to_time: null },
unsupported_ftz_op = { from_tz: 'lorem ipsum floe lafsak lasogrelasad fgalr', from_time: null, to_tz: 'mm', to_time: null },
no_ttz_op = { from_tz: 'America/Los_Angeles', from_time: null, to_time: null },
null_ttz_op = { from_tz: 'America/Los_Angeles', from_time: null, to_tz: null, to_time: null },
unsupported_ttz_op = { from_tz: 'America/Los_Angeles', from_time: null, to_tz: 'loresa', to_time: null }

test('test with no from_tz is an empty object', () => {
    expect(() => convert(no_ftz_op)).toThrowError('from_tz is required')
})

test('test with null from_tz is an empty object', () => {
    expect(() => convert(null_ftz_op)).toThrowError('from_tz is required')
})

test('test with unsupported from_tz', () => {
    expect(() => convert(unsupported_ftz_op)).toThrowError('from_tz value is not supported')
})

test('test with no to_tz is an empty object', () => {
    expect(() => convert(no_ttz_op)).toThrowError('to_tz is required')
})

test('test with null to_tz is an empty object', () => {
    expect(() => convert(null_ttz_op)).toThrowError('to_tz is required')
})

test('test with unsupported to_tz', () => {
    expect(() => convert(unsupported_ttz_op)).toThrowError('to_tz value is not supported')
})

test('success test', () => {
    expect(convert(complete_op)).toBe("convert from " + " to ")
})

console.log("testing....")