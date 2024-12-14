import { getRequestLinks } from "api/requests";
import { useDispatch } from "react-redux";
import { setLinkId } from "redux/linkSlice";
export const fetchAndStoreLinkId = async (userId) => {
  const dispatch = useDispatch();

  try {
    const response = await getRequestLinks(userId); // 링크 조회 API 호출
    if (response?.data?.linkId) {
      dispatch(setLinkId(response.data.linkId)); // 링크 ID를 Redux에 저장
      console.log("Link ID stored in Redux:", response.data.linkId);
    } else {
      throw new Error("Link ID not found in response.");
    }
  } catch (error) {
    console.error("Error fetching and storing link ID:", error);
  }
};
