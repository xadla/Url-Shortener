import authAPI from "./api";
import { getStoredCsrfToken } from "./csrf";

const Signup = async (full_name, username, password, password2) => {
  const csrf = getStoredCsrfToken();

  const res = await authAPI.post(
    "signup/",
    {full_name, username, password, password2},
    {
      headers: {
        "X-CSRFToken": csrf,
      },
    }
  );

  return res;
}

export default Signup;
