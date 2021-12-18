import './App.css';
import Home from './components/Home';

import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import React,{useState} from 'react';
import SearchBar from './components/SearchBar';
import Images from './components/Images';
function App() {
  const [alert, setAlert] = useState(null)
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);

  }
  return (
    <>
    <NoteState showAlert={showAlert}>
    <Router>
    <Navbar/>
    <Images/>
    <Alert alert={alert}/>
    <div className="container my-3">
      <Switch>
      
        <Route exact path='/'>
        <SearchBar/>
        <Home showAlert={showAlert}/>
        
        </Route>
        <Route exact path='/login'>
        <Login showAlert={showAlert}/>
        </Route>
        <Route exact path='/signup'>
        <Signup showAlert={showAlert}/>
        </Route>
      </Switch>
      </div>
    </Router>
      

  
    </NoteState>
    </>
  );
}

export default App;
