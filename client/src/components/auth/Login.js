import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

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
              <div className="form-group">
                <input
                  type="email"
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': formData.errors.email
                  })}
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formData.errors.email && (<small className="invalid-feedback">{formData.errors.email}</small>)}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': formData.errors.password
                  })}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {formData.errors.password && (<small className="invalid-feedback">{formData.errors.password}</small>)}
              </div>
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