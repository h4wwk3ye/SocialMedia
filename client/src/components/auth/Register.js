import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from '../common/TextFieldGroup'

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  })

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push('/dashboard')
    }
  })

  useEffect(() => {
    setFormData({ ...formData, errors: props.errors })
  }, [props.errors])

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password2: formData.password2
    }

    props.registerUser(newUser, props.history)
  }


  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Social Media account</p>
            <form onSubmit={handleSubmit} noValidate>
              <TextFieldGroup
                placeholder="Name"
                name="name"
                value={formData.name}
                error={formData.errors.name}
                type="text"
                handleChange={handleChange}
              />

              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                value={formData.email}
                error={formData.errors.email}
                type="email"
                handleChange={handleChange}
              />

              <TextFieldGroup
                placeholder="Password"
                name="password"
                value={formData.password}
                error={formData.errors.password}
                type="password"
                handleChange={handleChange}
              />

              <TextFieldGroup
                placeholder="Confirm Password"
                name="password2"
                value={formData.password2}
                error={formData.errors.password2}
                type="password"
                handleChange={handleChange}
              />
              <input
                type="submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))