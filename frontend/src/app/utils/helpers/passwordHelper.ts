import config from "@/app/config/config";

export async function forgetPassword(email: string): Promise<boolean> {
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
      console.log("Email sent successfully");
      return true;
    } else {
      if (responseData.error !== undefined) {
        throw new Error(responseData.error as string);
      }
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
