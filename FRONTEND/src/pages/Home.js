import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);
  return (
    <>
      <div className="jumbotron">
        <h1 className="ht">Hello !!! {user ? user.name : null}</h1>
        <p className="p1">Welcome To The SLIIT Reasearch Management Tool</p>
        <img className="img3" src="/r.gif"/>
        <p className="p1"> Lets Get Started .... Good Luck For Your Project !!!</p>
      </div>
    </>
  );

















};

export default Home;
