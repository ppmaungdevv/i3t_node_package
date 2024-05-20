import { getAllTzs } from './src/timezone.js'

export const convert = (opt) => {
    // validation
    // console.log('--------------', !opt)

    // object validation twy ko helper htl po
    if (!opt || typeof opt !== 'object' || Object.keys(opt).length < 1) {
        throw new Error('Invalid Params')
    }

    const { from_tz, from_time, to_tz, to_time } = opt

    if (!from_tz) {
        throw new Error('from_tz is required')
    }

    return "convert from " + " to ";
}