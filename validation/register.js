import validator from "validator"

export default data => {
    let errors = {}

    if (!('name' in data)) data.name = ''
    if (!('email' in data)) data.email = ''
    if (!('password' in data)) data.password = ''
    if (!('password2' in data)) data.password2 = ''

    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = "name must be between 2 and 30 characters"
    }

    if (validator.isEmpty(data.name)) {
        errors.name = "Name is required"
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required"
    }

    if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required"
    }

    if (!validator.isLength(data.password, { min: 5 })) {
        errors.password = "Password must be larger than 6 characters"
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm Password is required"
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match"
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }

}