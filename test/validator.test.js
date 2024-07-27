import { expect, test } from 'vitest'
import { isInvalidObject, isValidTz, isValidMultiTzs, isValidTimeFormat, isValidDateFormat } from '../validator/validator'

/* 
*
* Time format validator test
*
*/

test('test isValidDateFormat validation func with invalid param', () => {
   expect(isValidDateFormat(false)).toBe(false)
   expect(isValidDateFormat('10-23-2024')).toBe(false)
})

test('test isValidDateFormat validation func with valid param', () => {
   expect(isValidDateFormat('2024-12-23')).toBe(true)
   expect(isValidDateFormat('2024/12/23')).toBe(true)

})


/* 
*
* Time format validator test
*
*/

test('test isValidTimeFormat validation func with no param', () => {
   expect(isValidTimeFormat()).toBe(false) // default time zone for Intl.DateTimeFormat is the local time zone of the environment 
})

test('test isValidTimeFormat validation func with invalid param', () => {
   expect(isValidTimeFormat(false)).toBe(false)
})

test('test isValidTimeFormat validation func with invalid time string', () => {
   expect(isValidTimeFormat('false')).toBe(false)
   expect(isValidTimeFormat('24:61')).toBe(false) // 24 hrs format
   expect(isValidTimeFormat('23:15 PM')).toBe(false) // hh:mm a format

})

test('test isValidTimeFormat validation func with valid time string', () => {
   expect(isValidTimeFormat('23:15')).toBe(true) // 24 hrs format
   expect(isValidTimeFormat('00:00')).toBe(true) // 24 hrs format
   expect(isValidTimeFormat('11:15 PM')).toBe(true) // hh:mm a format
})


/* 
*
* Time zone validator test
*
*/

test('test isValidTz func with no param', () => {
    expect(isValidTz()).toBe(true) // default time zone for Intl.DateTimeFormat is the local time zone of the environment 
})

test('test isValidTz func with invalid Tz', () => {
    expect(isValidTz('Africa_Abidjan')).toBe(false)
})

test('test isValidTz func with valid Tz', () => {
    expect(isValidTz('Africa/Abidjan')).toBe(true)
})

// Africa/Abidjan

// isValidMultiTzs

test('test isValidMultiTzs func with invalid Tz', () => {
   expect(isValidMultiTzs(['Africa/Abidjan', 'Invalid/Timezone'])).toEqual(['Invalid/Timezone'])
})

test('test isValidMultiTzs func with valid Tz', () => {
   expect(isValidMultiTzs(['Asia/Tokyo', 'Asia/Bangkok'])).toEqual([])
})

/* 
*
* Object validator test
*
*/
test('test Invalid Obj validation func with no param', () => { 
    // const timeZones = Intl.supportedValuesOf('timeZone');
    // console.log(timeZones);

    expect(isInvalidObject()).toBe(true)
 })

 test('test Invalid Obj validation func with undefined', () => {
    expect(isInvalidObject(undefined)).toBe(true)
 })

 test('test Invalid Obj validation func with string', () => { 
    expect(isInvalidObject('undefined')).toBe(true)
 })

 test('test Invalid Obj validation func with empty Obj', () => {
    expect(isInvalidObject({})).toBe(true)
 })

 test('test Invalid Obj validation func with null', () => {
    expect(isInvalidObject(null)).toBe(true)
 })