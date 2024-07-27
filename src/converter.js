import { format, parse } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz'
import { ValidationError } from '../error/errors'
import { getFormattedTime, getDateFormat } from '../helper/helpers'
import { isValidTz, isValidMultiTzs, isValidTimeFormat, isValidDateFormat } from '../validator/validator'


const converter = (from_tz, to_tz, time_string, date, origin_date_format) => {

    const { origin_format, formatted_time } = getFormattedTime(time_string)

    const date_time_string = `${date} ${formatted_time}`

    const from_utc_format = fromZonedTime(date_time_string, from_tz)

    const to = toZonedTime(from_utc_format, to_tz)
    console.log(date, to, date_time_string, from_utc_format, to_tz)

    return  {
                to_date: format(to, origin_date_format),
                to_time: format(to, origin_format),
                to_tz,
            }
}

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

    
    let date_format = 'yyyy-MM-dd',
    origin_date_format = date_format,
    date = format(new Date(), date_format);
    
    if (date_string != null) {
        // **** date_string format must be 'yyyy-MM-dd' or 'yyyy/MM/dd'
        if (!isValidDateFormat(date_string)) {
            throw new ValidationError('Invalid date format', "date format must be 'yyyy-MM-dd' or 'yyyy/MM/dd'")
        }

        origin_date_format = getDateFormat(date_string)
        date = format(parse(date_string, origin_date_format, new Date()), date_format)
    }

    // **** date_fns utc only supports 24 hrs format, so need to format the time

    const { origin_format, formatted_time } = getFormattedTime(time_string)

    const date_time_string = `${date} ${formatted_time}`

    const from_utc_format = fromZonedTime(date_time_string, from_tz)

    const to = toZonedTime(from_utc_format, to_tz)

    const converted_data = {
        from :
            {
                from_date: date_string ?? date,
                from_time: time_string,
                from_tz,
            },
        to :
            {
                to_date: format(to, origin_date_format),
                to_time: format(to, origin_format),
                to_tz,
            }
    }

    return converted_data
}

export const convertToMany = (from_tz, to_tz, time_string, date_string) => {
    if (!from_tz) {
        throw new ValidationError('from_tz is required', "convertToMany('Continent/City', ['Continent/City', ...], 'hh:mm a')")
    }

    if (!to_tz) {
        throw new ValidationError('to_tzs is required', "convertToMany('Continent/City', ['Continent/City', ...], 'hh:mm a')")
    }

    if (!Array.isArray(to_tz)) {
        throw new ValidationError('Invalid type', "to_tzs must be an array, ['Continent/City', ...]")
    }

    if (time_string == null) {
        throw new ValidationError('time_string is required', "convertToMany('Continent/City', ['Continent/City', ...], 'hh:mm a')")
    }
    
    if (!isValidTz(from_tz)) {
        throw new ValidationError('Invalid time zone format', "time zone format must be 'Continent/City'")
    }

    if (isValidMultiTzs(to_tz).length > 0) {
        throw new ValidationError('Invalid time zone format', isValidMultiTzs(to_tz) + " format must be 'Continent/City'")
    }
    

    // **** time format must be 'hh:mm AM||PM' or 24 hr fomat
    
    if (typeof time_string !== 'string' || !isValidTimeFormat(time_string)) {
        throw new ValidationError('Invalid time format', "time format must be 'HH:mm' or 'hh:mm a'")
    }

    
    let date_format = 'yyyy-MM-dd',
    origin_date_format = date_format,
    date = format(new Date(), date_format); // utc only supports yyyy-MM-dd
    
    if (date_string != null) {
        // **** date_string format must be 'yyyy-MM-dd' or 'yyyy/MM/dd'
        if (!isValidDateFormat(date_string)) {
            throw new ValidationError('Invalid date format', "date format must be 'yyyy-MM-dd' or 'yyyy/MM/dd'")
        }

        origin_date_format = getDateFormat(date_string)
        date = format(parse(date_string, origin_date_format, new Date()), date_format)
    }

    // **** date_fns utc only supports 24 hrs format, so need to format the time


    // const converted_data = converter(from_tz, to_tz, time_string, date_string, date, origin_date_format)

    const converted_data = {
        from :
            {
                // from_date: date,
                from_date: date_string ?? date,
                from_time: time_string,
                from_tz,
            },
        to: []
    }

    to_tz.forEach(tz => {
        converted_data.to.push(converter(from_tz, tz, time_string, date, origin_date_format))
    })

    console.log(converted_data)

    return converted_data
}