import config from "@/app/config/config";

async function forgetPassword(
  email: string
): Promise<Record<string, string | boolean>> {
  try {
    const response = await fetch(`${config.backendUrl}/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const responseData = await response.json();
    if (response.ok) {
      return {
        hasError: false,
        message: "Email sent successful."
      };
    } else if (responseData.error !== undefined) {
      throw new Error(responseData.error as string);
    } else {
      return {
        hasError: true,
        message: "Unknown error occurred. Please contact the administrator."
      };
    }
  } catch (error) {
    return {
      hasError: true,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please contact the administrator."
    };
  }
}

async function resetPassword(
  data: Record<string, string>
): Promise<Record<string, string | boolean>> {
  try {
    const response = await fetch(`${config.backendUrl}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    if (response.ok) {
      return {
        hasError: false,
        message: "Password reset successful."
      };
    } else if (responseData.error !== undefined) {
      throw new Error(responseData.error as string);
    } else {
      return {
        hasError: true,
        message: "Unknown error occurred. Please contact the administrator."
      };
    }
  } catch (error) {
    return {
      hasError: true,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please contact the administrator."
    };
  }
}

export { forgetPassword, resetPassword };
