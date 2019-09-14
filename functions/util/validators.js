const isEmpty = string => string.trim() === "";
const isEmail = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

exports.validateSignupData = data => {
  const errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Email must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.password)) errors.password = "Password must not be empty";

  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must match";

  if (isEmpty(data.handle)) errors.handle = "Handle must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0
  };
};

exports.validateLoginData = data => {
  const errors = {};

  if (isEmpty(data.email)) errors.email = "Email must not be empty";
  else if (!isEmail(data.email)) errors.email = "Must be a valid email";

  if (isEmpty(data.password)) errors.password = "Password must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0
  };
};

exports.reduceUserDetails = data => {
  let userDetails = {};

  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.website.trim())) {
    if (!data.website.trim().startsWith("http"))
      userDetails.website = `http://${data.website.trim()}`;
    else userDetails.website = data.website;
  }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};
