export const validateUsername = ( value: string ) => value.length >= 3;
export const validateEmail = ( value: string ) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);