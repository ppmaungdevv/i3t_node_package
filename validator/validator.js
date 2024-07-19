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