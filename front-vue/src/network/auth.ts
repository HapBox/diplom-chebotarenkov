import netClient from "./config";

export async function registrationReq(data: any) {
  try {
    const response = await netClient.post("/auth/sign-up/", data);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("systemRole", response.data.systemRole);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function loginReq(data: any) {
  try {
    const response = await netClient.post("/auth/sign-in/", data);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("systemRole", response.data.systemRole);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function logoutReq() {
  try {
    const response = await netClient.post("/auth/logout/");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("systemRole");
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}
