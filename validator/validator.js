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

export const isValidTimeFormat = (time_string) => {
    // time format must be 'hh:mm AM||PM' or 24 hr fomat
    
    if (typeof time_string !== 'string') {
        return false
    }

    const formats = ['HH:mm', 'hh:mm a']

    for (const format of formats) {
        const parsed_time = parse(time_string, format, new Date())
        // isValid
        if (isValid(parsed_time)) {
            return true
        }
    }
    
    return false
}

export const isValidDateFormat = (date_string) => {
    // date format must be 'yyyy-MM-dd' or 'yyyy/MM/dd'
    
    if (typeof date_string !== 'string') {
        return false
    }

    const formats = ['yyyy-MM-dd', 'yyyy/MM/dd']
    // const format = 'yyyy-MM-dd'

    for (const format of formats) {
        const parsed_date = parse(date_string, format, new Date())
        if (isValid(parsed_date) && parsed_date.toString() !== 'Invalid Date') {
            return true
        }
    }

    return false
}