import apiClient from "./apiClient";

/**
 * 특정 사용자의 요청 링크를 가져오는 API
 * @param {Number} userId - 요청 링크를 가져올 사용자의 ID
 * @returns {Promise<Object>} - 요청 링크 데이터 또는 에러 정보
 */
export const getRequestLinks = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID not found in the store.");
    }

    const response = await apiClient.get(`/users/${userId}/links`);
    return response.data;
  } catch (error) {
    console.error("Error fetching request links:", error);
    return {
      error:
        error.response?.data || error.message || "An unknown error occurred.",
    };
  }
};

/**
 * 특정 링크 ID로 요청 리스트를 가져오는 API
 * @param {String} linkId - 요청 리스트를 가져올 링크 ID
 * @returns {Promise<Object>} - 요청 리스트 데이터
 */
export const getRequests = async (linkId) => {
  const response = await apiClient.get(
    `/requests/links/${linkId}?page=0&size=100`
  );
  return response.data;
};

/**
 * 특정 링크 ID로 요청을 가져오는 API
 * @param {String} requestId - 요청을 가져올 링크 ID
 * @returns {Promise<Object>} - 요청 데이터
 */
export const getRequestById = async (requestId) => {
  const response = await apiClient.get(
    // `/letters/${requestId}/requests?page=0&size=10`
    `/requests/links/${requestId}`
  );
  return response.data;
};

/**
 * 특정 요청을 업데이트하는 API
 * @param {Number} id - 업데이트할 요청의 ID
 * @param {Object} data - 업데이트할 데이터 객체
 * @returns {Promise<Object>} - 업데이트된 요청 데이터
 */
export const updateRequest = async (id, data) => {
  try {
    const response = await apiClient.put(`/requests/${id}`, data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating request:", error.message || error);
    throw new Error("요청 업데이트에 실패했습니다. 다시 시도해주세요.");
  }
};

/**
 * 특정 요청을 삭제하는 API
 * @param {Number} id - 삭제할 요청의 ID
 * @returns {Promise<Object>} - 삭제 결과 데이터
 */
export const deleteRequest = async (id) => {
  const response = await apiClient.delete(`/requests/${id}`);
  return response.data;
};

/**
 * 특정 링크 ID에 새로운 요청을 생성하는 API
 * @param {Object} data - 생성할 요청의 데이터 객체
 * @param {String} linkId - 요청을 생성할 링크 ID
 * @returns {Promise<Object>} - 생성된 요청 데이터
 */
export const createRequest = async (data, linkId) => {
  try {
    const response = await apiClient.post(`/requests/links/${linkId}`, data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating request:", error.message || error);
    throw new Error("요청 생성에 실패했습니다. 다시 시도해주세요.");
  }
};
