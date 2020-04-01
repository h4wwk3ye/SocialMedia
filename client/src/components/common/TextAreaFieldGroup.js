import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

function TextAreaFieldGroup({
  name,
  placeholder,
  value,
  error,
  info,
  handleChange,
}) {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
      {info && <small classnames="form-text text-muted">{info}</small>}
      {error && (<small className="invalid-feedback">{error}</small>)}
    </div>
  )
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
}

export default TextAreaFieldGroup;