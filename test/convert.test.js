import { expect, test } from 'vitest'
import { convert } from './src/converter.js'


let from_tz = "jp", to_tz = "mm"

test('first test', () => {
    expect(convert(from_tz, to_tz)).toBe("convert from " + from_tz + " to " + to_tz)
})
console.log("testing....")