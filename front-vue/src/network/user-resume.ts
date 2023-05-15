import netClient from "./config";

export async function getUserResume() {
  try {
    const response = await netClient.get("/client/user-resume/my");
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function updateResume(data: any) {
  try {
    const response = await netClient.patch(
      "/client/user-resume/" + data.id,
      data
    );
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function createResume(data: any) {
  try {
    const response = await netClient.post("/client/user-resume/", data);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}