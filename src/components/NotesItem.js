import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function NotesItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  const [Count, SetCount] = useState(1);

  const add = () => {
    SetCount(Count + 1);
  };
  const Subtract = () => {
    SetCount(Count - 1);
  };
  return (
    
    <>
      <div class="card m-2 " style={{ width: "18rem" }}>

{/* // https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png */}
        <img
          src={note.description}
          class="card-img-top rounded mx-auto d-block my-4"
          alt="..."
          style={{ width: "4rem" }}
        />
        <h2>img: {note.description}</h2>
        <div class="card-body text-center p-1 m-0  ">
          <h5 class="card-title p-0 m-0 ">{note.title}</h5>
        </div>
        <div class="card-body text-center p-0 m-2 ">
          <h5 class="card-title p-0 m-0 ">{Count}</h5>
        </div>
        <div
          class="dropdown position-absolute"
          style={{ top: "0px", right: "5px" }}
        >
          <button
            class="btn   bg-white"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false "
         >
            <i class="fa fa-ellipsis-v"></i>
          </button>
          <ul class="dropdown-menu p-2  position-absolute" aria-labelledby="dropdownMenuButton1 "  style={{minWidth:"55px"  }}>
            <li className="p-0 m-0">
              <a href="#" className="btn p-0 m-0">
                <span
                  className=""
                  onClick={() => {
                    updateNote(note);
                  }}
                >Edit</span>
              </a>
            </li>
            <li className="p-0 m-0">
              <a href="#" className="btn p-0 m-0">
                <spa
                  
                  onClick={() => {
                    deleteNote(note._id);
                  }}
                >Delete</spa>
              </a>
            </li>
          </ul>
        </div>

        <div class=" row m-2">
          <div class="  col">
            <button
              class="p-2 mb-2 bg-primary rounded text-white"
              style={{ width: "6rem" }}
              onClick={add}
            >
              Add
            </button>
            <input
              type="number"
              onChange={add}
              class="rounded form-control"
              style={{ width: "6rem" }}
            />
          </div>
          <div class=" col ">
            <button
              class="p-2 rounded mb-2 bg-danger text-white"
              style={{ width: "6rem" }}
              onClick={Subtract}
            >
              Subtract
            </button>
            <input
              type="number"
              onChange={Subtract}
              class="rounded form-control"
              style={{ width: "6rem" }}
            />
          </div>
        </div>
      </div>
      </>
    
  );
}
