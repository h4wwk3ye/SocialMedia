import validator from 'validator'

export default data => {
    let errors = {}
    if (!('school' in data)) data.school = ''
    if (!('degree' in data)) data.degree = ''
    if (!('from' in data)) data.from = ''

    if (validator.isEmpty(data.school)) {
        errors.school = 'School is required'
    }
    if (validator.isEmpty(data.degree)) {
        errors.degree = 'Degree is required'
    }
    if (validator.isEmpty(data.from)) {
        errors.from = 'Joining date is required'
    }
    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}