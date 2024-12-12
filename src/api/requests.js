import apiClient from "./apiClient";

export const getRequests = async () => {
  const response = await apiClient.get("/requests");
  return response.data;
};

export const getRequestById = async id => {
  const response = await apiClient.get(`/requests/${id}`);
  return response.data;
};

export const updateRequest = async (id, data) => {
  try {
    const response = await apiClient.put(`/requests/${id}`, data);
    if (response.status === 200) {
      return response.data; // 성공적으로 업데이트된 데이터를 반환
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating request:", error.message || error);
    throw new Error("요청 업데이트에 실패했습니다. 다시 시도해주세요.");
  }
};

export const deleteRequest = async id => {
  const response = await apiClient.delete(`/requests/${id}`);
  return response.data;
};

export const createRequest = async data => {
  try {
    const response = await apiClient.post("/requests", data);
    if (response.status === 201) {
      return response.data; // 성공적으로 생성된 데이터를 반환
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating request:", error.message || error);
    throw new Error("요청 생성에 실패했습니다. 다시 시도해주세요.");
  }
};
