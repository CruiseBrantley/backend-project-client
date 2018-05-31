import React, { Component } from "react";
import { arrayMove } from "react-sortable-hoc";
import SideBar from "./sidebar";
import ListView from "./listview";
import CreateNote from "./createnote";
import ViewCard from "./viewcard";
import EditNote from "./editnote";
import "./notes.css";
import axios from "axios";

function isSorted(arr) {
  let len = arr.length - 1;
  for (let i = 0; i < len; ++i) {
    if (arr[i].title > arr[i + 1].title) {
      return false;
    }
  }
  return true;
}

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      filteredNotes: [],
      search: "",
      view: "list",
      currentCard: 0
    };
  }

  componentWillMount() {
    const self = this;
    axios
      .get("https://cruise-backend.herokuapp.com/api/notes", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(function(response) {
        console.log(response.data);
        self.setState({ notes: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  addNote = (title, text) => {
    axios
      .post(
        "https://cruise-backend.herokuapp.com/api/notes",
        { title, text },
        {
          headers: { Authorization: localStorage.getItem("token") }
        }
      )
      .then(response => {
        if (response) {
          let noteState = this.state.notes;
          noteState.push(response.data);
          this.setState({
            view: "list",
            notes: noteState
          });
        } else console.log("Something went wrong.");
      });
  };

  changeToList = () => {
    this.setState({ view: "list" });
  };

  changeToCreate = () => {
    this.setState({ view: "create" });
  };

  changeToEdit = () => {
    this.setState({ view: "edit" });
  };

  viewNote = _id => {
    this.setState({ currentCard: _id, view: "view" });
  };

  removeNote = _id => {
    axios
      .delete(`https://cruise-backend.herokuapp.com/api/notes/${_id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => {
        if (response) {
          console.log(response);
          this.setState({
            view: "list",
            notes: this.state.notes.filter(e => e._id !== _id)
          });
        } else console.log("Something went wrong. Response was ", response);
      });
  };

  removeAllNotes = () => {
    this.setState({ view: "list", notes: [] });
  };

  editNote = (title, text, _id) => {
    axios
      .put(
        `https://cruise-backend.herokuapp.com/api/notes/${_id}`,
        { title, text },
        {
          headers: { Authorization: localStorage.getItem("token") }
        }
      )
      .then(response => {
        if (response) {
          const currNoteIndex = this.state.notes.findIndex(e => e._id === _id);
          const tempNotes = this.state.notes;
          const data = response.data;
          tempNotes[currNoteIndex] = data;
          this.setState({ view: "view", notes: tempNotes });
        } else console.log("Something went wrong. Response was ", response);
      });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      notes: arrayMove(this.state.notes, oldIndex, newIndex)
    });
  };

  sortList = () => {
    let baseList = this.state.notes;
    let sortedList;
    if (isSorted(baseList))
      sortedList = this.state.notes.sort((a, b) => {
        var titleA = a.title.toLowerCase(); // ignore upper and lowercase
        var titleB = b.title.toLowerCase(); // ignore upper and lowercase
        if (titleA < titleB) {
          return 1;
        }
        if (titleA > titleB) {
          return -1;
        }
        return 0;
      });
    else
      sortedList = this.state.notes.sort((a, b) => {
        var titleA = a.title.toLowerCase(); // ignore upper and lowercase
        var titleB = b.title.toLowerCase(); // ignore upper and lowercase
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
    this.setState({
      notes: sortedList
    });
  };

  render() {
    if (this.state.view === "list") {
      return (
        <div className="full-container">
          <SideBar
            changeToList={this.changeToList}
            changeToCreate={this.changeToCreate}
            removeAllNotes={this.removeAllNotes}
            notes={this.state.notes}
          />
          <ListView
            notes={this.state.notes}
            viewNote={this.viewNote}
            onSortEnd={this.onSortEnd}
            sortList={this.sortList}
          />
        </div>
      );
    }
    if (this.state.view === "create") {
      return (
        <div className="full-container">
          <SideBar
            changeToList={this.changeToList}
            changeToCreate={this.changeToCreate}
            removeAllNotes={this.removeAllNotes}
            notes={this.state.notes}
          />
          <CreateNote addNote={this.addNote} />
        </div>
      );
    }
    if (this.state.view === "view") {
      return (
        <div className="full-container">
          <SideBar
            changeToList={this.changeToList}
            changeToCreate={this.changeToCreate}
            removeAllNotes={this.removeAllNotes}
            notes={this.state.notes}
          />
          <ViewCard
            note={this.state.notes.find(e => e._id === this.state.currentCard)}
            removeNote={this.removeNote}
            changeToEdit={this.changeToEdit}
          />
        </div>
      );
    }
    if (this.state.view === "edit") {
      return (
        <div className="full-container">
          <SideBar
            changeToList={this.changeToList}
            changeToCreate={this.changeToCreate}
            removeAllNotes={this.removeAllNotes}
            notes={this.state.notes}
          />
          <EditNote
            note={this.state.notes.find(e => e._id === this.state.currentCard)}
            editNote={this.editNote}
          />
        </div>
      );
    }
    return <h1>Something didn't work</h1>;
  }
}
