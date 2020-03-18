import validator from "validator"

export default data => {
    let errors = {}

    if (!('handle' in data)) data.handle = ''
    if (!('status' in data)) data.status = ''
    if (!('skills' in data)) data.skills = ''

    if (validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is requried'
    }

    if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle nees to between 2 and 40 characters'
    }

    if (validator.isEmpty(data.status)) {
        errors.status = "Status is required"
    }

    if (('website' in data) && !validator.isURL(data.website)) {
        errors.website = 'Not a valid URL'
    }

    if (('youtube' in data) && !validator.isURL(data.youtube)) {
        errors.youtube = 'Not a valid URL'
    }
    if (('twitter' in data) && !validator.isURL(data.twitter)) {
        errors.twitter = 'Not a valid URL'
    }
    if (('facebook' in data) && !validator.isURL(data.facebook)) {
        errors.facebook = 'Not a valid URL'
    }
    if (('linkedin' in data) && !validator.isURL(data.linkedin)) {
        errors.linkedin = 'Not a valid URL'
    }
    if (('instagram' in data) && !validator.isURL(data.instagram)) {
        errors.instagram = 'Not a valid URL'
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }

}