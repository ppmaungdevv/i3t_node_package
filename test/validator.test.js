import { expect, test } from 'vitest'
import { isInvalidObject, isValidTz } from '../validator/validator'

test('test Tz validation func with no param', () => {
    expect(isValidTz()).toBe(true) // default time zone for Intl.DateTimeFormat is the local time zone of the environment 
})

test('test Tz validation func with invalid Tz', () => {
    expect(isValidTz('Africa_Abidjan')).toBe(false)
})

test('test Tz validation func with valid Tz', () => {
    expect(isValidTz('Africa/Abidjan')).toBe(true)
})

// Africa/Abidjan

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