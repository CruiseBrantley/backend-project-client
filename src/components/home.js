import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    <h1>Home</h1>
    <Link to="/notes">Notes</Link>
    <br />
    <a href="http://src/resume/index.html">Resume</a>
  </div>
);

export default Home;
