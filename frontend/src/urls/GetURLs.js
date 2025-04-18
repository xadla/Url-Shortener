import urlAPI from "./api";
import { getStoredCsrfToken } from "../auth/csrf";


const GetURLs = async (task_id) => {
  const csrf = getStoredCsrfToken();

  const result = await urlAPI.get(
    "get/",
    {
      headers: {
        "X-CSRFToken": csrf,
      }
    }
  );
  return result.data;
};

export default GetURLs;
