import apiClient from "./apiClient";

export const getLetters = async () => {
  const response = await apiClient.get("/letters");
  return response.data;
};

export const getLetterById = async id => {
  const response = await apiClient.get(`/letters/${id}`);
  return response.data;
};

export const createLetter = async data => {
  try {
    const response = await apiClient.post("/letters", data);
    if (response.status === 201) {
      return response.data; // 성공적으로 생성된 데이터를 반환
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating letter:", error.message || error);
    throw new Error("편지 생성에 실패했습니다. 다시 시도해주세요.");
  }
};
