import React, { useEffect } from "react"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";

const Dashboard = (props) => {

  useEffect(() => {
    props.getCurrentProfile()
  }, [])

  const { user } = props.auth
  const { profile, loading } = props.profile

  let dashboardContent;

  if (profile === null || loading === true) {
    dashboardContent = <Spinner />
  } else {
    console.log(profile)
    // Check if user has profile
    if (Object.keys(profile).length > 0) {
      dashboardContent = <h4>TODO</h4>
    } else {
      // user is logged in but has no profile
      dashboardContent =
        <div>
          <p className="lead text-muted">Welcome! {user.name}</p>
          <p>You have not yet seup a profiles</p>
          <Link to="/create-profile" className="btn btn-lg btn-info"> Create Profile </Link>
        </div>
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)