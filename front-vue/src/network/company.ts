import netClient from "./config";

export async function getCompany() {
  try {
    const response = await netClient.get("/client/companies/");
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function updateCompany(data: any) {
  try {
    const response = await netClient.patch("/client/companies/", data);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function createCompany(data: any) {
  try {
    const response = await netClient.post("/client/companies/", data);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}
