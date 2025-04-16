import urlAPI from "./api";
import { getStoredCsrfToken } from "../auth/csrf";

const CreateURL = async (url, username) => {
  const csrf = getStoredCsrfToken();

  const res = await urlAPI.post(
    "create/",
    {"username": username, "original_url": url},
    {
      headers: {
        "X-CSRFToken": csrf,
      },
    }
  );
  return res;
};


export default CreateURL;
