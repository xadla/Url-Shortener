import authAPI, {getCsrfToken} from "./api";


const Login = async (username, password) => {
  await getCsrfToken();
  const res = await authAPI.post("login/", { username, password });
  return res;
};


export default Login;
