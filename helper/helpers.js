import { parse, isValid, format } from 'date-fns'

export const getFormattedTime = (time_string) => {
    const time_formats = ['HH:mm', 'hh:mm a']
    const formatted =  {
        origin_format: '',
        formatted_time: '',
    }
    
    for (const time_format of time_formats) {
        const parsed_time = parse(time_string, time_format, new Date())
        
        if (isValid(parsed_time)) {
            if (time_format === 'HH:mm') {  
                formatted.origin_format = 'HH:mm'
                formatted.formatted_time = time_string
                return formatted
            } else {
                formatted.origin_format = 'hh:mm a'
                formatted.formatted_time = format(parsed_time, 'HH:mm')
                return formatted
            }
        }
    }

    return null
    
}