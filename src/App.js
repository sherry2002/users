import './App.css';
import "./App.css"
import "./pages/style.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import UserForm from './pages/UserForm';
import UserList from './pages/UserList';
import NotFound from './pages/NotFounde';
import { useState, useEffect} from 'react';
//3rd party packages
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let [userList,setUserList] = useState([]);
  let [userListVersion,setUserListVersion] = useState(1);
  console.log("abcd44",userListVersion)
  useEffect(()=>{
    // get user data from local storage
      if(localStorage.getItem("userList")){
          setUserList(JSON.parse(localStorage.getItem("userList")));
      }
  },[userListVersion]);
  
  return (
    <>
    <ToastContainer/>
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Switch>
            <Route path="/" exact>
             <UserForm userListVersion={userListVersion} setUserListVersion={setUserListVersion}/>
            </Route>
            <Route path="/users" exact>
              <UserList userList= {userList}/>
            </Route>
            <Route component={NotFound} />
            {/* Add more routes as needed <Route exact path="/" component={UserForm} />
            <Route exact path="/users" component={UserList} />
            <Route component={NotFound} />*/}
          </Switch>
        </div>
      </div>
    </Router>
    </>
  );
}

export default App;
