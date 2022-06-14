import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

const AllRegisterTopic = () => {
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
          setRegisterTopics(result.myRegisterTopics);
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
      <div>
        <h1>Your Topics</h1>
        <a href="/myregistertopics" className="btn btn-danger my-2">
          Reload ...
        </a>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading ..." />
        ) : (
          <>
            {registertopics.length == 0 ? (
              <h3>No topics registered yet</h3>
            ) : (
              <>
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control my-2"
                    placeholder="Search topics"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-info mx-2">
                    Search
                  </button>
                </form>

                <p>
                  Your Total Contacts: <strong>{registertopics.length}</strong>
                </p>
                <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Group ID</th>
                      <th scope="col">Topic</th>
                      <th scope="col">Field</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registertopics.map((registertopic) => (
                      <tr
                        key={registertopic._id}
                        onClick={() => {
                          setModalData({});
                          setModalData(registertopic);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{registertopic.groupid}</th>
                        <td>{registertopic.topic}</td>
                        <td>{registertopic.field}</td>
                        <td>{registertopic.des}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
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

export default AllRegisterTopic;
