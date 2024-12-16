import apiClient from "./apiClient";

/**
 * 모든 편지 데이터를 가져오는 API
 * @returns {Promise<Object>} - 모든 편지 데이터
 */
export const getLetters = async () => {
  try {
    const response = await apiClient.get("/letters?status=COMPLETED&page=0&size=10");
    return response.data;
  } catch (error) {
    console.error("Error fetching letters:", error.message || error);
    throw new Error("편지 리스트를 불러오는 데 실패했습니다.");
  }
};
/**
 * 수정 편지 데이터를 가져오는 API
 * @returns {Promise<Object>} - 모든 편지 데이터
 */
export const getDraftLetters = async () => {
  try {
    const response = await apiClient.get("/letters?status=DRAFT&page=0&size=10");
    return response.data;
  } catch (error) {
    console.error("Error fetching letters:", error.message || error);
    throw new Error("편지 리스트를 불러오는 데 실패했습니다.");
  }
};
/**
 * 특정 ID로 편지 데이터를 가져오는 API
 * @param {Number} letterId - 가져올 편지의 ID
 * @returns {Promise<Object>} - 특정 편지 데이터
 */
export const getLetterById = async letterId => {
  try {
    const response = await apiClient.get(`/letters/${letterId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching letter by ID:", error.message || error);
    if (error.response?.status === 404) {
      throw new Error("해당 편지를 찾을 수 없습니다.");
    }
    throw new Error("편지 조회에 실패했습니다.");
  }
};

/**
 * 새로운 편지를 생성하는 API
 * @param {Object} data - 생성할 편지의 데이터 객체
 * @returns {Promise<Object>} - 생성된 편지 데이터
 * @throws {Error} - 편지 생성 실패 시 에러 메시지
 */
export const createLetter = async data => {
  try {
    const response = await apiClient.post(`/letters`, data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating letter:", error.message || error);
    if (error.response?.status === 400) {
      throw new Error(error.response?.data?.error?.[0]?.message || "잘못된 요청입니다.");
    }
    throw new Error("편지 생성에 실패했습니다. 다시 시도해주세요.");
  }
};
/**
 * 편지 데이터를 수정하는 API
 * @param {Number} letterId - 수정할 편지의 ID
 * @param {Object} updateData - 수정할 편지 데이터 객체
 * @param {String} updateData.writer - 편지를 작성한 사람
 * @param {String} updateData.receiver - 편지를 받는 사람
 * @param {String} updateData.content - 편지 내용
 * @param {Object} updateData.metadata - 편지 메타데이터
 * @param {String} updateData.metadata.font - 편지 글꼴
 * @param {String} updateData.metadata.stationery - 편지지 스타일
 * @returns {Promise<Object>} - 수정 성공 메시지 또는 에러 정보
 * @throws {Error} - 편지 수정 실패 시 에러 메시지
 */
export const updateLetter = async (letterId, updateData) => {
  try {
    const response = await apiClient.put(`/letters/${letterId}`, updateData);
    if (response.status === 200) {
      return response.data; // 성공 메시지 반환
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating letter:", error.message || error);
    if (error.response?.status === 400) {
      throw new Error(error.response?.data?.error?.[0]?.message || "잘못된 요청입니다.");
    }
    throw new Error("편지 수정에 실패했습니다. 다시 시도해주세요.");
  }
};
/**
 * 특정 ID의 편지를 삭제하는 API
 * @param {Number} letterId - 삭제할 편지의 ID
 * @returns {Promise<Object>} - 삭제 성공 메시지
 * @throws {Error} - 편지 삭제 실패 시 에러 메시지
 */
export const deleteLetterById = async letterId => {
  try {
    const response = await apiClient.delete(`/letters/${letterId}`);
    if (response.status === 200) {
      return response.data; // 삭제 성공 메시지를 반환
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting letter by ID:", error.message || error);
    if (error.response?.status === 404) {
      throw new Error("해당 편지를 찾을 수 없습니다.");
    }
    throw new Error("편지 삭제에 실패했습니다. 다시 시도해주세요.");
  }
};
