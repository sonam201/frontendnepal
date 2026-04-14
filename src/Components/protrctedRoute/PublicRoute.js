import React from "react";
import { useNavigate } from "react-router-dom";
export default function PublicRoute({ children }) {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return navigate("/");
  } else {
    return children;
  }
}
