import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

const AllRegisterTopic2 = () => {
  const { toast } = useContext(ToastContext);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [registertopics, setRegisterTopics] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/myregistertopics`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setRegisterTopics(result.registertopics);
        setLoading(false);
      } else {
        console.log(result);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteRegisterTopic = async (id) => {
    if (window.confirm("are you sure you want to delete this topic ?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/deletetopic/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setRegisterTopics(result.myregistertopics);
          toast.success("Deleted topic");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchTopic = registertopics.filter((registertopic) =>
      registertopic.groupid.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(newSearchTopic);
    setRegisterTopics(newSearchTopic);
  };

  return (
    <>
      <div><div class="container2">
  <div class="row">
    <div class="col">
    <img className="img3" src="/topic1.png"/>
        </div>
        <div class="col">
        <h1>Your Topics</h1>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading ..." />
        ) : (
          <>
            {registertopics.length == 0 ? (
              <h3>No topics registered yet</h3>
            ) : (
              <>

                <p>
                  Your Total Contacts: <strong>{registertopics.length}</strong>
                </p>
                <div class="container1">
                  
                    {registertopics.map((registertopic) => (
                      <tr
                        key={registertopic._id}
                        onClick={() => {
                          setModalData({});
                          setModalData(registertopic);
                          setShowModal(true);
                        }}
                      >
                        <div className="form-group1" >{registertopic.groupid}</div>
                        <div className="form-group2">Topic : {registertopic.topic}</div>
                        <div className="form-group2">Field : {registertopic.field}</div>
                        <div className="form-group2">Description : {registertopic.des}</div>
                        <p>-----------------------------------------------------------</p>
                       <p>We will provide feedback on the status of your topic as soon as possible.  Stay updated on that.</p>
                      </tr>
                    ))}
                  </div>
                
              </>
            )}
          </>
        )}

</div>
        
        </div></div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.groupid}</h3>
          <p>
            <strong> Group ID</strong>: {modalData.groupid}
          </p>
          <p>
            <strong>Topic</strong>: {modalData.topic}
          </p>
          <p>
            <strong>Research Field</strong>: {modalData.field}
          </p>
          <p>
            <strong>Description</strong>: {modalData.des}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edit/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteRegisterTopic(modalData._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllRegisterTopic2;
