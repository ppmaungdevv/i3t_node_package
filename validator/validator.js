import { parse, isValid } from 'date-fns'

export const isInvalidObject = (obj) => {
    return !obj || typeof obj !== 'object' || Object.keys(obj).length < 1;
}

export const isValidTz = (tz) => {
    try {
        // if no tz, default time zone for Intl.DateTimeFormat is the local time zone of the environment 
        new Intl.DateTimeFormat('en-US', { timeZone: tz })
        return true
    } catch (error) {
        return false
    }
}

export const isValidTimeFormat = (timeString) => {
    // time format must be 'hh:mm AM||PM' or 24 hr fomat
    
    if (typeof timeString !== 'string') {
        return false
    }

    const formats = ['HH:mm', 'hh:mm a']

    for (const format of formats) {
        const parsedTime = parse(timeString, format, new Date())
        // isValid
        if (isValid(parsedTime)) {
            return true
        }
    }
    
    return false
}