import urlAPI from "./api";
import { getStoredCsrfToken } from "../auth/csrf";


const GetResult = async (task_id) => {
  const csrf = getStoredCsrfToken();

  const result = await urlAPI.get(
    `tasks/${task_id}/`,
    {
      headers: {
        "X-CSRFToken": csrf,
      }
    }
  );
  return result.data;
};

export default GetResult;
