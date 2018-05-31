import React from "react";
import { CSVLink } from "react-csv";
import { Route } from "react-router-dom";

const SideBar = props => {
  return (
    <div className="sidebar-div">
      <h1>Cruise Notes</h1>
      <div
        className="view-notes-button button"
        onClick={() => props.changeToList()}
      >
        View Your Notes
      </div>
      <div
        className="create-note-button button"
        onClick={() => props.changeToCreate()}
      >
        + Create New Note
      </div>
      <CSVLink data={props.notes} className="csv-button button">
        Download CSV
      </CSVLink>
      <Route
        render={({ history }) => (
          <div
            className="delete-notes-button button"
            onClick={() => {
              localStorage.removeItem("token");
              history.push("/notes/login");
            }}
          >
            Logout
          </div>
        )}
      />
    </div>
  );
};

export default SideBar;
