export const checkInvalidObject = (obj) => {
    return !obj || typeof obj !== 'object' || Object.keys(obj).length < 1;
}