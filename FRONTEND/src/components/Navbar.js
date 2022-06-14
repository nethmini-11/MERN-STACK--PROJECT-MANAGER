import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Navbar = ({ title =  <img className="logo" src="/cover.png"/> }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <div className="container-fluid">
        <Link to="/">
          <a className="navbar-brand">{title}</a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>

              <li className="nav-item">
                <div class="dropdown">
                <button class="dropbtn">Create Research Groups</button>
                <div class="dropdown-content">
                <Link to="/addgroup">
                    <a className="nav-link1">ADD STUDENT GROUP</a>
                  </Link>
                  <Link to="/alladdgroup">
                    <a className="nav-link1">Created Groups</a>
                  </Link>
                  <Link to="/alladdgroup2">
                    <a className="nav-link1">My Group</a>
                  </Link>
                </div></div>
                  
                </li>
              <li className="nav-item">
                <div class="dropdown">
                <button class="dropbtn">Register Research Topics</button>
                <div class="dropdown-content">
                <Link to="/registertopic">
                    <a className="nav-link1">Topic Registration</a>
                  </Link>
                  <Link to="/myregistertopics">
                    <a className="nav-link1">All Topics</a>
                  </Link>
                  <Link to="/myregistertopics2">
                    <a className="nav-link1">My Topic</a>
                  </Link>
                </div></div>
                  
                </li>
                
                

                
                
                
                <li className="nav-item">
                <div class="dropdown">
                <button class="dropbtn">Make Your Submission</button>
                <div class="dropdown-content">
                <Link to="/uploadfile">
                  
                    <a className="nav-link1">Make Submissions</a>
                  </Link>
                  
                </div></div>
                  
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    setUser(null);
                    localStorage.clear();
                    toast.success("Logged out.");
                    navigate("/login", { replace: true });
                  }}
                >
                  <button className="btn5 btn-danger">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login">
                    <a className="nav-link">Login</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register">
                    <a className="nav-link">Register</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/home">
                    <a className="nav-link">home</a>
                  </Link>
                </li>






              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;