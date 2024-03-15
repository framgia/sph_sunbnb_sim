function validateForgetPassword(
  email: string
): Record<string, string | boolean> {
  if (email === "") {
    return {
      hasError: true,
      message: "Please provide an email address."
    };
  }
  return {
    hasError: false,
    message: "Validation successful."
  };
}

function validateResetPassword(
  data: Record<string, string>
): Record<string, string | boolean> {
  if (data.password !== data.password_confirmation) {
    return {
      hasError: true,
      message: "Passwords do not match."
    };
  }
  if (data.password.length < 8) {
    return {
      hasError: true,
      message: "Password must be at least 8 characters long."
    };
  }
  return {
    hasError: false,
    message: "Validation successful."
  };
}

export { validateForgetPassword, validateResetPassword };
