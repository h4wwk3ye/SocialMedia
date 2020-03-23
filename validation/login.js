import validator from "validator"

export default data => {
  let errors = {}

  if (!('email' in data)) data.email = ''
  if (!('password' in data)) data.password = ''

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required"
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required"
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  }

}