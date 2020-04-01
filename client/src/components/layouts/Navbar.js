import React from "react"
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

const Navbar = (props) => {
    const { isAuthenticated, user } = props.auth

    function onLogoutClick(event) {
        event.preventDefault()
        props.clearCurrentProfile()
        props.logoutUser()
    }

    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a
                    href='#'
                    onClick={onLogoutClick}
                    className="nav-link"
                >
                    LogOut
                </a>
            </li>
        </ul >
    )

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </ul>
    )

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">Social Media</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profiles"> Developers</Link>
                        </li>
                    </ul>

                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar)