import authAPI, {getCsrfToken} from "./api";


const CheckUser = async (username, password) => {
  const csrfToken = await getCsrfToken();

  const res = await authAPI.post(
    "check/",
    { username, password },
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
    }
  );

  return res;
};


export default CheckUser;
