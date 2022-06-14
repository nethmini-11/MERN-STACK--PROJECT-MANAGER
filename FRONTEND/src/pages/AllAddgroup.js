import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

const AllAddgroup = () => {
  const { toast } = useContext(ToastContext);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [addgroups, setAddgroups] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/myaddgroups`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setAddgroups(result.addgroups);
        setLoading(false);
      } else {
        console.log(result);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteAddgroup = async (id) => {
    if (window.confirm("are you sure you want to delete this groups?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/deletegroup/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setAddgroups(result.myAddgroups);
          toast.success("Deleted contact");
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

    const newSearchAddgroup = addgroups.filter((addgroup) =>
      addgroup.groupid.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(newSearchAddgroup);
    setAddgroups(newSearchAddgroup);
  };

  return (
    <>
      <div>
        <h1>Your Groups</h1>
        <a href="/alladdgroup" className="btn btn-danger my-2">
          Reload Contact
        </a>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading ..." />
        ) : (
          <>
            {addgroups.length == 0 ? (
              <h3>No groups created yet</h3>
            ) : (
              <>
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control my-2"
                    placeholder="Search Contact"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-info mx-2">
                    Search
                  </button>
                </form>

                <p>
                  Your Total groups: <strong>{addgroups.length}</strong>
                </p>
                <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Group ID</th>
                      <th scope="col">Member 1</th>
                      <th scope="col">Member 2</th>
                      <th scope="col">Member 3</th>
                      <th scope="col">Member 4</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addgroups.map((addgroup) => (
                      <tr
                        key={addgroup._id}
                        onClick={() => {
                          setModalData({});
                          setModalData(addgroup);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{addgroup.groupid}</th>
                        <td>{addgroup.mem1}</td>
                        <td>{addgroup.mem2}</td>
                        <td>{addgroup.mem3}</td>
                        <td>{addgroup.mem4}</td>
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
          <Modal.Title>{modalData.groupid}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.groupid}</h3>
          <p>
            <strong>member 1</strong>: {modalData.mem1}
          </p>
          <p>
            <strong>member 2</strong>: {modalData.mem2}
          </p>
          <p>
            <strong>member 3</strong>: {modalData.mem3}
          </p>
          <p>
            <strong>member 4</strong>: {modalData.mem4}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/editaddgroup/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteAddgroup(modalData._id)}
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

export default AllAddgroup;
