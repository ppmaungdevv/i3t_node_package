import { checkInvalidObject } from '../helpers/validate-object.js'
import { getAllTzs } from './timezone.js'

export const convert = (opt) => {
    // validation

    // object validation twy ko helper htl po
    if (checkInvalidObject(opt)) {
        throw new Error('Invalid Params')
    }

    const { from_tz, from_time, to_tz, to_time } = opt

    if (!from_tz) {
        throw new Error('from_tz is required')
    }

    if (!to_tz) {
        throw new Error('to_tz is required')
    }

    const tzs = getAllTzs()
    
    if (!tzs.includes(from_tz)) {
        throw new Error('from_tz value is not supported')
    }

    if (!tzs.includes(to_tz)) {
        throw new Error('to_tz value is not supported')
    }

    return "convert from " + from_tz + " to " + to_tz;
}