import { useContext } from "react";
import TopBar from "./Components/TopBar/TopBar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Settings from "./Pages/Settings/Settings";
import Single from "./Pages/Single/Single";
import Write from "./Pages/Write/Write";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { UserContext } from "./Context/userContext";

function App() {
  const { userData: user } = useContext(UserContext);
  return (
    <div className="App">
      <Router>
        <TopBar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={user ? Home : Login} />

          <Route path="/register" Component={user ? Home : Register} />

          <Route path="/settings" Component={user ? Settings : Login} />

          <Route path="/post/:postid" Component={Single} />
          <Route path="/write" Component={user ? Write : Login} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
