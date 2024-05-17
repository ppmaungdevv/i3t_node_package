import momentTZ from 'moment-timezone'

export const getAllTzs = () => {
    return momentTZ.tz.names()
}