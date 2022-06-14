import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const AddGroup = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [groupDetails, setGroupDetails] = useState({
    groupid: "",
    mem1: "",
    mem2: "",
    mem3: "",
    mem4: "",
  });
  const navigate = useNavigate();
  //dont change name here
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    //dont change name here
    setGroupDetails({ ...groupDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/addgroup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(groupDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Created [${groupDetails.groupid}] group`);

      setGroupDetails({ groupid: "", mem1: "", mem2: "", mem3: "", mem4: "" });
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
    
    <div class="container2">
  <div class="row">
  <div class="col">
      
      <img className="img2" src="/grp.png"/>
    </div>
    <div class="col1">
      <h2 class="heading">Create Your Group</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="groupidInput" className="form-label mt-4">
            Group ID
          </label>
          <input
            type="text"
            className="form-control"
            id="groupidInput"
            name="groupid"
            value={groupDetails.groupid}
            onChange={handleInputChange}
            placeholder="GRP_RXXX_Y4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mem1Input" className="form-label mt-4">
            Member 1 (Group Leader)
          </label>
          <input
            type="text"
            className="form-control"
            id="mem1Input"
            name="mem1"
            value={groupDetails.mem1}
            onChange={handleInputChange}
            placeholder="University Registered Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mem2Input" className="form-label mt-4">
          Member 2
          </label>
          <input
            type="text"
            className="form-control"
            id="mem2Input"
            name="mem2"
            value={groupDetails.mem2}
            onChange={handleInputChange}
            placeholder="University Registered Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mem3Input" className="form-label mt-4">
          Member 3
          </label>
          <input
            type="text"
            className="form-control"
            id="mem3Input"
            name="mem3"
            value={groupDetails.mem3}
            onChange={handleInputChange}
            placeholder="University Registered Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mem4Input" className="form-label mt-4">
          Member 4
          </label>
          <input
            type="text"
            className="form-control"
            id="mem4Input"
            name="mem4"
            value={groupDetails.mem4}
            onChange={handleInputChange}
            placeholder="University Registered Name"
            required
          />
        </div>
        
        <input
          type="submit"
          value="Create Group"
          className="btn1 btn-info my-2"
        />
      </form></div>
      </div></div>
      
      
    </>
  );
};

export default AddGroup;
