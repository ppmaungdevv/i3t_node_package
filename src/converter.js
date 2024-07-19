import { format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz'
import { ValidationError } from '../error/errors'
import { isValidTz } from '../validator/validator'


export const convert = (from_tz, to_tz, time, d) => {
    // try {
        
        if (!from_tz) {
            throw new ValidationError('from_tz is required', "convert('Continent/City', 'Continent/City')")
        }

        
        if (!isValidTz(from_tz) || !isValidTz(to_tz)) {
            throw new ValidationError('Invalid time zone format', "time zone format must be 'Continent/City'")
        }
        
        if (!to_tz) {
            throw new ValidationError('to_tz is required', "convert('Continent/City', 'Continent/City')")
        }
        // time format must be 'HH:mm AM||PM'

        // Get the current date
        const currentDate = new Date();

        // Format the current date to YYYY-MM-DD
        const formattedDate = format(currentDate, 'yyyy-MM-dd');

        const timeString = "11:20:00";
        // Combine the formatted date with the time string
        const dateTimeString = `${formattedDate} ${timeString}`;

        const from_utc_format = fromZonedTime(dateTimeString, from_tz)
        console.log(from_utc_format)
        const to = toZonedTime(from_utc_format, to_tz)
        console.log(to)
        //
        return 'Success'
    // } catch (error) {
    //     // const relevantError = extractRelevantError(error);

    //     // Display the extracted error message
    //     console.error(error.message);
    // }
}