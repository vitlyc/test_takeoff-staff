import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { setCurrentUser } from "./store/user/user.action";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import SignInForm from "./components/sign-in-form/sign-in-form";
import SignUpForm from "./components/sign-up-form/sign-up-form";
import Navigation from "./components/navigation/navigation";
import ContactList from "./components/contact-list/contact-list";
import ProtectedRoute from "./components/protected-route/protected-route";

import { login, register } from "./utils/Api";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async ({ email, password }) => {
    await login({ email, password }).then((res) => {
      dispatch(setCurrentUser(res));
      navigate("/main");
    });
  };

  const handleRegister = async ({ email, password }) => {
    await register({ email, password }).then((res) => {
      dispatch(setCurrentUser(res));
      navigate("/main");
    });
  };

  useEffect(() => {
    //auth user
  });

  return (
    <div className="App">
      <section className="App-header">
        <Navigation />
        <Routes>
          <Route index element={<SignInForm handleLogin={handleLogin} />} />
          <Route
            path="sign-up"
            element={<SignUpForm handleRegister={handleRegister} />}
          />
          <Route
            path="/main"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <ContactList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </section>
    </div>
  );
}

export default App;
