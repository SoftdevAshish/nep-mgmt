export function validateEmail(email: string) : Boolean{
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRegex.test(email);
}

export function validatePhoneNumber(number: string) : Boolean {
    const phonePattern = /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/gm;
    return phonePattern.test(number);
}