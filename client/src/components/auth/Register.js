import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom'
import classnames from "classnames"
import { connect } from 'react-redux'
import { registerUser } from "../../actions/authActions";

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
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': formData.errors.name
                  })}
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {formData.errors.name && (<small className="invalid-feedback">{formData.errors.name}</small>)}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': formData.errors.email
                  })}
                  placeholder="Email Address"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                />
                {formData.errors.email && (<small className="invalid-feedback">{formData.errors.email}</small>)}
                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': formData.errors.password
                  })}
                  placeholder="Password"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                />
                {formData.errors.password && (<small className="invalid-feedback">{formData.errors.password}</small>)}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': formData.errors.password2
                  })}
                  placeholder="Confirm Password"
                  value={formData.password2}
                  name="password2"
                  onChange={handleChange}
                />
                {formData.errors.password2 && (<small className="invalid-feedback">{formData.errors.password2}</small>)}
              </div>
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
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))