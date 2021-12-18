import React, { useState } from "react";
import { useHistory } from "react-router-dom";
export default function Signup(props) {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  const host = "http://localhost:5000";
  let history = useHistory();
  const handleSignup = async (e) => {
    const { name, email, password } = credential;
    e.preventDefault();
    const response = await fetch(`${host}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history.push("/");
      props.showAlert("Account Created Successfully ","success");

    } else {
      props.showAlert("Invalid Credential ","danger");
    }
  };
  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="w-75 mx-auto">
        <form onSubmit={handleSignup}>
          <div className="mb-3 ">
            <label htmlFor="name" className="form-label">
              username
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={onchange}
              aria-describedby="nameHelp"
            />
            <div id="username" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3 ">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onchange}
              aria-describedby="emailHelp"
            />
            <div id="email" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onchange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
