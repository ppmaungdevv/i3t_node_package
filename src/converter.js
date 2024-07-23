import { format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz'
import { ValidationError } from '../error/errors'
import { getFormattedTime } from '../helper/helpers'
import { isValidTz, isValidTimeFormat, isValidDateFormat } from '../validator/validator'


export const convert = (from_tz, to_tz, time_string, date_string) => {
    if (!from_tz) {
        throw new ValidationError('from_tz is required', "convert('Continent/City', 'Continent/City', 'hh:mm a')")
    }

    if (!to_tz) {
        throw new ValidationError('to_tz is required', "convert('Continent/City', 'Continent/City', 'hh:mm a')")
    }

    if (time_string == null) {
        throw new ValidationError('time_string is required', "convert('Continent/City', 'Continent/City', 'hh:mm a')")
    }
    
    if (!isValidTz(from_tz) || !isValidTz(to_tz)) {
        throw new ValidationError('Invalid time zone format', "time zone format must be 'Continent/City'")
    }
    

    // **** time format must be 'hh:mm AM||PM' or 24 hr fomat
    
    if (typeof time_string !== 'string' || !isValidTimeFormat(time_string)) {
        throw new ValidationError('Invalid time format', "time format must be 'HH:mm' or 'hh:mm a'")
    }

    // **** date format must be 'yyyy-MM-dd' or 'yyyy/MM/dd'

    if (date_string != null && !isValidDateFormat(date_string)) {
        throw new ValidationError('Invalid date format', "date format must be 'yyyy-MM-dd' or 'yyyy/MM/dd'")
    }

    let date = format(new Date(), 'yyyy-MM-dd')
    if (date_string != null && isValidDateFormat(date_string)) {
        date = date_string
    }

    // **** date_fns utc only supports 24 hrs format, so need to format the time

    const { origin_format, formatted_time } = getFormattedTime(time_string)

    const date_time_string = `${date} ${formatted_time}`

    const from_utc_format = fromZonedTime(date_time_string, from_tz)

    const to = toZonedTime(from_utc_format, to_tz)

    const to_time = format(to, origin_format), to_date = format(to, 'yyyy-MM-dd')
    
    return {
        from :
            {
                from_date: date,
                from_time: time_string,
                from_tz,
            },
        to :
            {
                to_date,
                to_time,
                to_tz,
            }
    }
}