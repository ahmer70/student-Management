import React,{useContext,useState} from "react";
import noteContext from './../context/notes/noteContext';
export default function AddNote() {
    const context = useContext(noteContext);
    const{addNote}=context;
    const[note,setNote]=useState({title:"",description:"",tag:""});
    const submitForm=(e)=>{
        e.preventDefault();//taky page reload na ho
        addNote(note.title,note.description,note.tag);
setNote({title:"",description:"",tag:""});
    }
    const getInput=(e)=>{
        setNote({...note,[e.target.name]:e.target.value} )
    }
    
  return (
    <div>
     

      
<button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#addModal" style={{ width: "14rem",height: "14rem" ,color:"rgb(184, 185, 185)",backgroundColor:"rgb(231, 231, 231)"}}>
  <span style={{fontSize:"4rem"}}>+</span>
</button>


<div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form  method="post" enctype="multipart/form-data" >
      <div className="mb-3">
          <label htmlFor="description" className="form-label">
          Description
          </label>
          <input
            type="file"
            className="form-control"
            id="description" name="description"
            onChange={getInput}
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
           Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title" name="title"
            aria-describedby="emailHelp"
            onChange={getInput}
            value={note.title}
          />
         
        </div>
       
       
       
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" data-bs-dismiss="modal" onClick={submitForm} className="btn btn-primary">
          Add Note
        </button>
      </div>
      </form>
      </div>
      
    </div>
  </div>
</div>
      
     
    </div>
  );
}
