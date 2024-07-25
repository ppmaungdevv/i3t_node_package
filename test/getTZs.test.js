import { expect, test } from 'vitest'
// import second from ''
import { getTest } from '../index'

test('get all tzs test', () => { 
    // const timeZones = Intl.supportedValuesOf('timeZone');
    // console.log(timeZones);

    expect(getTest()).toBe('Success')
 })