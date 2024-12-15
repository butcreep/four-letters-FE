import React, { useEffect, useState } from "react";
import RequestList from "./requests/RequestList";
import CommonModal from "components/ui/CommonModal";
import { useNavigate } from "react-router-dom";
import Footer from "components/containers/FooterContainer";
import { deleteRequest, getRequestLinks, getRequests } from "../api/requests"; // 공통 API 가져오기
import { useSelector } from "react-redux";

const Home = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalType, setModalType] = useState(null); // 모달 타입 관리
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();
  const [linkId, setLinkId] = useState("");

  const userId = useSelector((state) => state.user?.userId);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true); // 로딩 시작
        const data = await getRequestLinks(userId);

        setLinkId(data?.data.linkId || "123");
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, [userId]);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true); // 로딩 시작
      try {
        console.log("linkId", linkId);

        const data = await getRequests(linkId);
        console.log("ddd", data);

        setRequests(data.data.content);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false); // 로딩 끝
      }
    };
    if (linkId) fetchRequests();
  }, [linkId]);

  const handleWriteLetter = () => {
    navigate(`/letter`, {
      state: { recipient: selectedRequest },
    });
  };
  const handleEditLetter = () => {
    navigate(`/letter/${selectedRequest.id}`, {
      state: { recipient: selectedRequest },
    });
  };

  const handleDeleteRequest = async () => {
    try {
      const response = await deleteRequest(selectedRequest.requestId); // 공통 API 호출

      if (response.message === "OK") {
        setRequests((prev) =>
          prev.filter((req) => req.requestId !== selectedRequest.requestId)
        ); // 로컬 상태에서 삭제
      }
      console.log("response", response);

      setSelectedRequest(null);
      setModalType(null);
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setModalType(null);
  };

  const handleCancel = () => {
    if (modalType === "deleteRequest") {
      handleCloseModal(); // deleteRequest에서 취소 시 모달 닫기
    } else if (modalType === "continueWriting") {
      handleCloseModal(); // continueWriting에서 취소 시 모달 닫기
    } else {
      setModalType("deleteRequest"); // friendRequest에서 취소 시 deleteRequest로 전환
    }
  };

  return (
    <>
      <RequestList
        requests={requests}
        loading={loading}
        onRequestClick={(req) => {
          setSelectedRequest(req);
          setModalType(req.isDraft ? "continueWriting" : "friendRequest");
        }}
      />

      {modalType && (
        <CommonModal
          type={modalType}
          isVisible={!!modalType}
          onCancel={handleCancel}
          onConfirm={
            modalType === "deleteRequest"
              ? handleDeleteRequest
              : modalType === "continueWriting"
              ? handleEditLetter
              : handleWriteLetter
          }
          onClose={handleCloseModal}
          data={selectedRequest}
        />
      )}
      <Footer />
    </>
  );
};

export default Home;
