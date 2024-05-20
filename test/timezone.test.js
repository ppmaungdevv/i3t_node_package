import { expect, test } from 'vitest'
import { getAllTzs } from './src/timezone.js'
import momentTZ from 'moment-timezone'


test('test getAllTzs', () => {
    // expect(getAllTzs()).toBe("get all tzs from moment")
    expect(getAllTzs()).toMatchObject(momentTZ.tz.names())
})