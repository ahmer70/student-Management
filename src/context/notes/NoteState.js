import react, { useState } from "react";
import NoteContext from "./noteContext";

export default function NoteState(props) {
  const host = "http://localhost:5000";
  // const s1={
  //      "name":"ahmer",
  //      "class":22
  // }

  // const[state ,setState]=useState(s1);
  // const update=()=>{
  //  setTimeout(()=>{
  //     setState({
  //         "name":"Ahmer asrain",
  //         "class":221
  //       })
  //  },1000);

  // }

  // const initialNote = [

  //   {
  //     _id: "313144cb839186b39a723b51c3567",
  //     user: "61342c8f2aa273917cd1c707",
  //     title: "My titile",
  //     description: "myu first decrraption",
  //     tag: "asd",
  //     date: "2021-09-05T04:51:04.714Z",
  //     __v: 0,
  //   },
  // ];

  const initialNote = [];

  const [notes, setNotes] = useState(initialNote);
  //getNote
  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add Notes
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //  const json= response.JSON();

    //ToDo:API Call
    console.log("adding");
    const note = {
      _id: "1613441cb8391861b3s9a7b51c3567",
      user: "61342c8f2aa2739s17cd1c707",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-05T04:51:04.714Z",
      __v: 0,
    };
    // setNotes(notes.push(note));
    setNotes(notes.concat(note)); //CREATE new aRRAY
    props.showAlert("Addedd Created Successfully ","success");

  };

  //Delete Notes

  const deleteNote = async (id) => {
    //api call to delete from database
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      

    });

    //set Manually
    const json = await response.json();
    console.log(json);
    const deleteNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(deleteNote);
    props.showAlert("Deleted Created Successfully ","success");
  };

  //Update Notes
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    //login top edit

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      key={notes._id}
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}
