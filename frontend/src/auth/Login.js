// import React from "react";
// import { jwtDecode } from "jwt-decode";
import authAPI, {getCsrfToken} from "./api";


const Login = async () => {

  await getCsrfToken();

  const username = "hadinjr";
  const password = "123";
  const res = await authAPI.post("login/", {username, password});

  console.log(res);

}


export default Login;
