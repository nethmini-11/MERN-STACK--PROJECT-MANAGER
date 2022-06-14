import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

const AllAddgroup2 = () => {
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
      addgroup.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(newSearchAddgroup);
    setAddgroups(newSearchAddgroup);
  };

  return (
    <><div class="container2">
    <div class="row">
      <div class="col">
      <div>
        <h4>Click to edit your group</h4>
       
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading ..." />
        ) : (
          <>
            {addgroups.length == 0 ? (
              <h3>No groups created yet</h3>
            ) : (
              <>
                <p>
                  Your Total groups: <strong>{addgroups.length}</strong>
                </p>
                
                <div class="container1">
                {addgroups.map((addgroup) => (
                      <tr
                        key={addgroup._id}
                        onClick={() => {
                          setModalData({});
                          setModalData(addgroup);
                          setShowModal(true);
                        }}
                      >
                      
                        <div className="form-group1" >{addgroup.groupid}</div>
                        <div className="form-group2">member 1 : {addgroup.mem1}</div>
                        <div className="form-group2">member 2 : {addgroup.mem2}</div>
                        <div className="form-group2">member 3 : {addgroup.mem3}</div>
                        <div className="form-group2">member 4 : {addgroup.mem4}</div>
                      </tr>
                    ))}
          </div>
              </>
            )}
          </>
        )}
      </div></div>
      <div class="col">
        <p></p>
<img className="img3" src="/edit.png"/>
<p><h5>Please Note :</h5>The group details entered first will be treated as your group details. If you need to make any changes to the information entered, edit the details and inform your supervisor or co-supervisor. This is valid only for acceptable reasons.</p>
</div>
      </div></div>

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

export default AllAddgroup2;
