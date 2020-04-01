import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

function SelectListGroup({
  name,
  value,
  error,
  info,
  handleChange,
  options
}) {

  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ))

  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          'is-invalid': error
        })}

        name={name}
        value={value}
        onChange={handleChange}
      >
        {selectOptions}
      </select>
      {info && <small classnames="form-text text-muted">{info}</small>}
      {error && (<small className="invalid-feedback">{error}</small>)}
    </div>
  )
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectListGroup;