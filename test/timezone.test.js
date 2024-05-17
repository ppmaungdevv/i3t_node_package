import { expect, test } from 'vitest'
import { getAllTzs } from './src/timezone.js'
import momentTZ from 'moment-timezone'


// let from_tz = "jp", to_tz = "mm"
// console.log(momentTZ.tz.names())

test('first test', () => {
    // expect(getAllTzs()).toBe("get all tzs from moment")
    expect(getAllTzs()).toMatchObject(momentTZ.tz.names())

})
console.log("testing tzs....")