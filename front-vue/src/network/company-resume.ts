import netClient from "./config";

export async function getCompanyResumeList() {
  try {
    const response = await netClient.get("/client/company-resume/");
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function getCompanyResumeListByCompanyId(id: number) {
  try {
    const response = await netClient.get(
      "/client/company-resume/?companyId=" + id
    );
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function getCompanyResumeListByResumeId(resumeId: number) {
  try {
    const response = await netClient.get(
      "/client/company-resume/" + resumeId + "/response"
    );
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function createCompanyResume(data: any) {
  try {
    const response = await netClient.post("/client/company-resume/", data);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function sendResponse(data: any) {
  try {
    const response = await netClient.post("/client/company-resume/response", data);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}
