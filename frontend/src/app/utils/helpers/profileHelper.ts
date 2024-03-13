import config from "@/app/config/config";

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  email: string;
  email_verified_at: string | null;
  provider: string | null;
  provider_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export async function fetchUserData(userId: number): Promise<UserProfile | null> {
  const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTEyYWJiZmYxMzc2ODUyNjM5ZGE3Mjc5YTM0NDA5YjM5YWU4NTBkMTgzYzBmYjExOWE4YzBjYmFiNmVmNzFiNGUyZjdjMGIwOTViNzM2NTIiLCJpYXQiOjE3MTAyMzQxNDEuNjE0MjkzLCJuYmYiOjE3MTAyMzQxNDEuNjE0Mjk1LCJleHAiOjE3NDE3NzAxNDEuNjA3MDU1LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.Levy8N6kLvp3GlM-NT1VItaz1l4PSNxL5_B1SY_OOLtStGHXdD1RNvJA2KWTafW0qCIdEfMDQmWCkaiOhVrIvdtELWmK2tLqf2xbu4Joct81ouohehJIcBySAzaa9eX-uoT82Bs09JWi-RRU09P2CKOZ1L7OPTc9bPuehl9Md14Nmrd3U6rqouXQ4UlXtiXR47XQ4TqnRSE3KyFbBt0oequ4kqkYdDWPkQAUGvzfRt02uWNntBRQ5mJeiTyG38I9SvMuc31paBiXu4IuSxLBcNoNTWimDEYuq1YbDhn3AoYC5ttIHV_D-RdeQD7ieitJMfhdr6d9m7NBj2seQLlmuuFNqVd4gpuGrVdcGx501ivXcX-iciZ5A8y63t1y0w5c5eCXO4QMMSBeopg-r-C-nOyu4Hq3H7epw4ShlM21xS2z5i9nOYnxB6JXxC7NokpW8pxqA-XgsGT6GlvZqkd0KyFhjoe-X9DUZal_iGvqDGaZ97lDhBSZTloEgKJ0pRHX3kU5Cx75PHMGPwVy7C_Sc-3bk_a0WRY1MfZp8K4PxRpgRo9EyUZXR-33M9STVziDlTpr4jvZO43iGYY89xsrl3lRjXVM2F1PumCJPQlmF7NFndqUKWrxlOPZ8QEgRxyBBAqWfXu8RGTHExitlWSQccJwI9QfQVNscqr6PEadZhI";

    const response = await fetch(`${config.backendUrl}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if(responseData.success as boolean) {
      return responseData.user;
    }

    return null;
 
}
