import validator from "validator"

export default data => {
    let errors = {}

    if (!('text' in data)) data.text = ''

    if (validator.isEmpty(data.text)) {
        errors.text = "Text can't be empty"
    }

    if (!validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = "Post must be between 10 and 300 characters"
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}