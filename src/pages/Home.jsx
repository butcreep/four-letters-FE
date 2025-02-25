import React, { useEffect, useState } from "react";
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

  const userId = useSelector((state) => state.user?.userId) || "123";

  useEffect(() => {
    const fetchRequestLinks = async () => {
      try {
        setLoading(true);
        const data = await getRequestLinks(userId);
        setLinkId(data?.linkId || "123"); // ✅ 안전한 방식
      } catch (error) {
        console.error("Error fetching request links:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequestLinks();
  }, [userId]);

  useEffect(() => {
    const fetchRequestsAndLetters = async () => {
      if (!linkId) return;

      setLoading(true);
      try {
        const requestData = await getRequests(linkId);
        const letterData = await getLetters();

        const letterRequestIds =
          letterData?.content?.map((letter) => letter.requestId) || [];
        const filteredRequests =
          requestData?.content?.filter(
            (req) => !letterRequestIds.includes(req.requestId)
          ) || [];

        setRequests(filteredRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestsAndLetters();
  }, [linkId]);

  const handleWriteLetter = () => {
    navigate(`/letter`, { state: { recipient: selectedRequest } });
  };

  const handleEditLetter = () => {
    navigate(`/letter/${selectedRequest.id}`, {
      state: { recipient: selectedRequest },
    });
  };

  const handleDeleteRequest = async () => {
    try {
      const response = await deleteRequest(selectedRequest.requestId);
      if (response.success) {
        setRequests((prev) =>
          prev.filter((req) => req.requestId !== selectedRequest.requestId)
        );
      }
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
        onRequestClick={(req) => {
          setSelectedRequest(req);
          setModalType(req.isDraft ? "continueWriting" : "friendRequest");
        }}
      />

      {modalType && (
        <CommonModal
          type={modalType}
          isVisible={!!modalType}
          onCancel={() => setModalType(null)}
          onConfirm={
            modalType === "deleteRequest"
              ? handleDeleteRequest
              : modalType === "continueWriting"
              ? handleEditLetter
              : handleWriteLetter
          }
          onClose={() => setModalType(null)}
          data={selectedRequest}
        />
      )}
      <Footer />
    </>
  );
};

export default Home;
