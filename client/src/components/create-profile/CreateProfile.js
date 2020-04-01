import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

const CreateProfile = (props) => {

  const [formData, setFormData] = useState({

    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  })

  const [displaySocialInputs, setDisplaySocialInputs] = useState(false)

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const profileData = {
      handle: formData.handle,
      company: formData.company,
      website: formData.website,
      location: formData.location,
      status: formData.status,
      skills: formData.skills,
      githubusername: formData.githubusername,
      bio: formData.bio,
      twitter: formData.twitter,
      facebook: formData.facebook,
      linkedin: formData.linkedin,
      youtube: formData.youtube,
      instagram: formData.instagram
    }
    props.createProfile(profileData, props.history)
  }

  function changeDisplaySocial() {
    if (displaySocialInputs)
      setDisplaySocialInputs(false)
    else
      setDisplaySocialInputs(true)
  }

  useEffect(() => {
    setFormData({ ...formData, errors: props.errors })
  }, [props.errors])

  let socialInputs
  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Twitter profile url"
          name="twitter"
          icon="fab fa-twitter"
          value={formData.twitter}
          handleChange={handleChange}
          error={formData.errors.twitter}
        />
        <InputGroup
          placeholder="Facebook profile url"
          name="facebook"
          icon="fab fa-facebook"
          value={formData.facebook}
          handleChange={handleChange}
          error={formData.errors.facebook}
        />
        <InputGroup
          placeholder="Linkedin profile url"
          name="linkedin"
          icon="fab fa-linkedin"
          value={formData.twitter}
          handleChange={handleChange}
          error={formData.errors.linkedin}
        />
        <InputGroup
          placeholder="Youtube channel url"
          name="youtube"
          icon="fab fa-youtube"
          value={formData.youtube}
          handleChange={handleChange}
          error={formData.errors.youtube}
        />
        <InputGroup
          placeholder="Instagram profile url"
          name="instagram"
          icon="fab fa-instagram"
          value={formData.instagram}
          handleChange={handleChange}
          error={formData.errors.instagram}
        />
      </div>
    )
  }

  // select options for status
  const options = [
    { label: '* Select Professional Status', value: 0 },
    { label: 'Developer', value: 'Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Student', value: 'Student' },
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' },
  ]

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create your Profile</h1>
            <p className="lead text-center">
              Add the information below
            </p>
            <small className="d-block pb-3" style={{ color: 'red' }}>*= required fields</small>

            <form onSubmit={handleSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={formData.handle}
                handleChange={handleChange}
                error={formData.errors.handle}
                info="A unique handle for your profile"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={formData.status}
                handleChange={handleChange}
                error={formData.errors.status}
                options={options}
                info="Select your job status"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={formData.company}
                handleChange={handleChange}
                error={formData.errors.company}
                info="The company you work for"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={formData.location}
                handleChange={handleChange}
                error={formData.errors.location}
                info="City or state"
              />
              <TextFieldGroup
                placeholder="Skills"
                name="skills"
                value={formData.skills}
                handleChange={handleChange}
                error={formData.errors.skills}
                info="Use comma separated value(eg. C++, Java)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={formData.githubusername}
                handleChange={handleChange}
                error={formData.errors.githubusername}
                info="If you want to include your repos"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={formData.bio}
                handleChange={handleChange}
                error={formData.errors.bio}
                info="Tell us about yourself"
              />
              <div className="mb-3">
                <button type="button" className="btn btn-light" onClick={changeDisplaySocial} >
                  Add Social Network links
                </button>
                <span className="text-muted"> Optional</span>
              </div>
              {socialInputs}
              <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )

}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))