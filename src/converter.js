import { format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz'
import { ValidationError } from '../error/errors'
import { isValidTz, isValidTimeFormat } from '../validator/validator'


export const convert = (from_tz, to_tz, timeString, d) => {
    if (!from_tz) {
        throw new ValidationError('from_tz is required', "convert('Continent/City', 'Continent/City', 'hh:mm a')")
    }

    if (!to_tz) {
        throw new ValidationError('to_tz is required', "convert('Continent/City', 'Continent/City', 'hh:mm a')")
    }

    if (timeString == null) {
        throw new ValidationError('timestring is required', "convert('Continent/City', 'Continent/City', 'hh:mm a')")
    }
    
    if (!isValidTz(from_tz) || !isValidTz(to_tz)) {
        throw new ValidationError('Invalid time zone format', "time zone format must be 'Continent/City'")
    }
    

    // time format must be 'hh:mm AM||PM' or 24 hr fomat

    if (typeof timeString !== 'string' || !isValidTimeFormat(timeString)) {
        throw new ValidationError('Invalid time format', "time format must be 'HH:mm' or 'hh:mm a'")
    }

    // Get the current date
    // const currentDate = new Date();

    // // Format the current date to YYYY-MM-DD
    // const formattedDate = format(currentDate, 'yyyy-MM-dd');

    // const timeString = "11:20:00";
    // // Combine the formatted date with the time string
    // const dateTimeString = `${formattedDate} ${timeString}`;

    // const from_utc_format = fromZonedTime(dateTimeString, from_tz)
    // console.log(from_utc_format)
    // const to = toZonedTime(from_utc_format, to_tz)
    // console.log(to)
    //
    return 'Success'
}