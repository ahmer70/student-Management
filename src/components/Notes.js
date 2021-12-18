import {useContext,useEffect,useRef,useState} from 'react';
import noteContext from '../context/notes/noteContext';
import NotesItem from './NotesItem';
import AddNote from './AddNote';
import { useHistory } from 'react-router';
import SearchBar from './SearchBar';
export default function Notes(props) {
    const context = useContext(noteContext);
    const{notes,getNote,editNote}=context;//destructuring

    const history=useHistory();
    const[note,setNote]=useState({id:"",e_title:"",e_description:"",e_tag:""});
    useEffect(() => {
      if(localStorage.getItem('token')){
        getNote();
    
      }else{
        history.push("/login");
        
      }
                // eslint-disable-next-line

    }, []);
const ref = useRef(null);
const refClose=useRef(null);
const updateNote=(currentNote)=>{
    ref.current.click();
    
    setNote({id:currentNote._id,e_title:currentNote.title,e_description:currentNote.description,e_tag:currentNote.tag});
  
};

const updateForm=(e)=>{
    e.preventDefault();//taky page reload na ho
    editNote(note.id,note.e_title,note.e_description,note.e_tag);

    refClose.current.click();
    props.showAlert("Updated Created Successfully ","success")
}
const getInput=(e)=>{
    setNote({...note,[e.target.name]:e.target.value} )
}
    return (

        <>
      <div className="row my-3">
                        

                        {notes.map((note)=>{
                            return <>
                            <NotesItem  key={note._id} showAlert={props.showAlert} note={note} updateNote={updateNote}/>
                            
                            </> ;
                        })}
                    </div>
<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Data</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="mb-3">
          
          <input
            type="file"
            className="form-control"
            id="e_description" 
            name="e_description"
            
            onChange={getInput}
          />
          <img src={note.e_description} alt="" />
        </div>
       
        <div className="mb-3">
          <label htmlFor="e_title" className="form-label">
           Title
          </label>
          <input
            type="text"
            className="form-control"
            id="e_title" name="e_title"
            aria-describedby="emailHelp"
            value={note.e_title}
            onChange={getInput}
          />
         
        </div>
        
      
      </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary " onClick={updateForm}>Update</button>
      </div>
    </div>
  </div>
</div>
        <AddNote showAlert={props.showAlert}/>
        
        </>
    )
}
