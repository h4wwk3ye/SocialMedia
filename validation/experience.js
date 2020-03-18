import validator from 'validator'

export default data => {
    let errors = {}
    if (!('title' in data)) data.title = ''
    if (!('company' in data)) data.company = ''
    if (!('from' in data)) data.from = ''

    if (validator.isEmpty(data.title)) {
        errors.title = 'Title is required'
    }
    if (validator.isEmpty(data.company)) {
        errors.company = 'Company is required'
    }
    if (validator.isEmpty(data.from)) {
        errors.from = 'Joining date is required'
    }
    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}