import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

import SignInForm from "./components/sign-in-form/sign-in-form";
import SignUpForm from "./components/sign-up-form/sign-up-form";
import Navigation from "./components/navigation/navigation";
import ContactList from "./components/contact-list/contact-list";

import { login, register } from "./utils/Api";

function App() {
  // const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = ({ email, password }) => {
    login({ email, password }).then((res) => {
      dispatch(setCurrentUser(res));
    });
    navigate("/main");
  };

  const handleRegister = ({ email, password }) => {
    console.log(email, password);
    register({ email, password }).then((res) => console.log(res.user));
  };

  useEffect(() => {
    //auth user
  });

  return (
    <div className="App">
      <section className="App-header">
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<SignInForm handleLogin={handleLogin} />} />
            <Route
              path="sign-up"
              element={<SignUpForm handleRegister={handleRegister} />}
            />
            <Route path="main" element={<ContactList />} />
          </Route>
        </Routes>
      </section>
    </div>
  );
}

export default App;
