/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.val, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action.");
  }
}

const FAKE_USER = {
  name: "Jane Jones",
  email: "jane@example.com",
  password: "qwerty123",
  avatar: "https://i.pravatar.cc/100?u=ac",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(e, email, password) {
    e.preventDefault();
    if (email === FAKE_USER.email && FAKE_USER.password === password)
      dispatch({ type: "login", val: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
