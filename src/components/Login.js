import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
export default function Login(props) {
    let history=useHistory();
    const host = "http://localhost:5000";
    const [credential, setCredential] = useState({email:"",password:""})
    const handleLogin = async(e)=>{
e.preventDefault();
const response = await fetch(`${host}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
      body:JSON.stringify({email:credential.email,password:credential.password})
  });
  const json = await response.json();
  console.log(json);
  if(json.success){
    //save the auth token and redirect 
localStorage.setItem('token',json.authToken)
history.push("/");
props.showAlert("LoggedIn Successfully ","success");

  }else{
    props.showAlert("Invalid Credential ","danger");

  }
    }
    const onchange=(e)=>{

        setCredential({...credential,[e.target.name]:e.target.value})
    }
    return (
        <div className="w-75 mx-auto">
            <form onSubmit={handleLogin}>
  <div className="mb-3 ">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={onchange} aria-describedby="emailHelp"/>
    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onchange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
        </div>
    )
}
