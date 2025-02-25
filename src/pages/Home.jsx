import React, { useEffect, useState, useRef } from "react";
import RequestList from "./requests/RequestList";
import CommonModal from "components/ui/CommonModal";
import { useNavigate } from "react-router-dom";
import Footer from "components/containers/FooterContainer";
import { deleteRequest, getRequestLinks, getRequests } from "../api/requests";
import { useSelector } from "react-redux";
import { getLetters } from "api/letters";

const Home = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [linkId, setLinkId] = useState("");

  // 기존 코드: 백엔드에서 userId를 가져오는 방식 (서버 필요)
  // const userId = useSelector((state) => state.user?.userId);

  // 수정 코드: 백엔드 없이 기본 userId 설정 (서버가 없을 때 사용)
  const userId = useSelector(state => state.user?.userId) || "test-user";

  // API 중복 호출 방지용 useRef
  const hasFetched = useRef(false);

  /**
   * 📌 기존 코드: 백엔드에서 requestLinks를 가져오는 방식 (백엔드 필요)
   *
   * useEffect(() => {
   *   const fetchRequests = async () => {
   *     try {
   *       setLoading(true);
   *       const data = await getRequestLinks(userId);
   *       setLinkId(data?.data?.linkId || "123");
   *     } catch (error) {
   *       console.error("Error fetching requests:", error);
   *     }
   *   };
   *   fetchRequests();
   * }, [userId]);
   */

  // 📌 수정 코드: 백엔드 없이 기본 linkId 설정
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        // 백엔드 없이 기본값 사용
        setLinkId("123");
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!linkId) fetchRequests();
  }, [linkId]);

  /**
   * 📌 기존 코드: 백엔드에서 요청 리스트를 가져오는 방식 (백엔드 필요)
   *
   * useEffect(() => {
   *   const fetchRequests = async () => {
   *     setLoading(true);
   *     try {
   *       const requestData = await getRequests(linkId);
   *       const letterData = await getLetters();
   *
   *       if (letterData.data) {
   *         const letterRequestIds = letterData?.data?.content?.map(
   *           (letter) => letter.requestId
   *         );
   *         const filteredRequests = requestData.data.content.filter(
   *           (req) => !letterRequestIds?.includes(req.requestId)
   *         );
   *         setRequests(filteredRequests);
   *       } else {
   *         setRequests(requestData.data.content);
   *       }
   *     } catch (error) {
   *       console.error("Error fetching requests:", error);
   *     } finally {
   *       setLoading(false);
   *     }
   *   };
   *   if (linkId) fetchRequests();
   * }, [linkId]);
   */

  // 📌 수정 코드: 백엔드 없이 요청 리스트 설정
  useEffect(() => {
    const fetchRequests = async () => {
      if (hasFetched.current) return; // ✅ API 중복 호출 방지
      setLoading(true);
      try {
        // 기본 요청 데이터 (목 데이터)
        const requestData = [
          { requestId: 1, title: "테스트 요청 1", isDraft: false },
          { requestId: 2, title: "테스트 요청 2", isDraft: true },
        ];

        setRequests(requestData);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
        hasFetched.current = true;
      }
    };

    if (linkId) fetchRequests();
  }, [linkId]);

  // 요청 삭제 (백엔드 없이 동작하도록 변경)
  const handleDeleteRequest = async () => {
    try {
      // 기존 백엔드 요청 삭제 (주석 처리)
      // const response = await deleteRequest(selectedRequest.requestId);
      // if (response.message === "OK") {

      // 백엔드 없이 로컬 상태에서 삭제
      setRequests(prev => prev.filter(req => req.requestId !== selectedRequest.requestId));

      setSelectedRequest(null);
      setModalType(null);
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  return (
    <>
      <RequestList
        requests={requests}
        loading={loading}
        onRequestClick={req => {
          setSelectedRequest(req);
          setModalType(req.isDraft ? "continueWriting" : "friendRequest");
        }}
      />

      {modalType && (
        <CommonModal
          type={modalType}
          isVisible={!!modalType}
          onCancel={() => setModalType(null)}
          onConfirm={modalType === "deleteRequest" ? handleDeleteRequest : () => console.log("기능 추가 예정")}
          onClose={() => setModalType(null)}
          data={selectedRequest}
        />
      )}
      <Footer />
    </>
  );
};

export default Home;
