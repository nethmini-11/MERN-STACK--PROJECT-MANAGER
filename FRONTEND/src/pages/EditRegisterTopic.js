import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const EditRegisterTopic = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [topicDetails, setTopicDetails] = useState({
    groupid: "",
    topic: "",
    field: "",
    des: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setTopicDetails({ ...topicDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/registertopic`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...topicDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`updated [${topicDetails.groupid}] topic`);

      setTopicDetails({groupid: "", topic: "", field: "", des: "" });
      navigate("/mytopics");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/registertopic/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      setTopicDetails({
        groupid:result.groupid,
        topic: result.topic,
        field: result.field,
        des: result.des,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading ..." />
      ) : (
        <>
          <div class="container2">
  <div class="row">
    <div class="col1">
      <h2 class="heading1">Register Your Topic</h2>

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
            value={topicDetails.groupid}
            onChange={handleInputChange}
            placeholder="GRP_RXXX_Y4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="topicInput" className="form-label mt-4">
            Topic
          </label>
          <input
            type="text"
            className="form-control"
            id="topicInput"
            name="topic"
            value={topicDetails.topic}
            onChange={handleInputChange}
            placeholder="Research project Topic"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fieldInput" className="form-label mt-4">
            Research Field
          </label>
          <input
            type="text"
            className="form-control"
            id="fieldInput"
            name="field"
            value={topicDetails.field}
            onChange={handleInputChange}
            placeholder="Specific research field for selected topic"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="desInput" className="form-label mt-4">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="desInput"
            name="des"
            value={topicDetails.des}
            onChange={handleInputChange}
            placeholder="Brief introduction about your topic"
            required
          />
        </div>
        <input
          type="submit"
          value="Register Topic"
          className="btn1 btn-info my-2"
        />
      </form></div>
      <div class="col">
      
      <img className="img2" src="/topic.png"/>
    </div></div></div>
        </>
      )}
    </>
  );
};

export default EditRegisterTopic;
