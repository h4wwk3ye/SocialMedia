import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from '../common/TextFieldGroup'

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errors: {}
  })

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push('/dashboard')
    }
  })

  useEffect(() => {
    if (props.auth.isAuthenticated)
      props.history.push('/dashboard')
    setFormData({ ...formData, errors: props.errors })
  }, [props.errors, props.auth.isAuthenticated])

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newUser = {
      email: formData.email,
      password: formData.password,
    }
    props.loginUser(newUser)
  }

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your Social Media account</p>
            <form onSubmit={handleSubmit} noValidate>

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


              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)